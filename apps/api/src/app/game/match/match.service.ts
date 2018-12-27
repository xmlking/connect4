import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../../core';
import { Match } from './match.entity';
import { MatchStatus, PlayerRole, PlayerValue } from '@xmlking/models';
import { User } from '../../auth';
import { MatchSettings } from './dto/match-settings.model';
import { EventBusGateway } from '../../shared';
import { PieceAdded, Player2Joined, StatusUpdate, WinnerUpdate } from '../interfaces/game.actions';

@Injectable()
export class MatchService extends CrudService<Match> implements OnModuleInit, OnModuleDestroy {
  matches: Map<string, Match> = new Map();
  private readonly logger = new Logger(MatchService.name);

  constructor(
    private readonly eventBus: EventBusGateway,
    @InjectRepository(Match) private readonly matchRepository: Repository<Match>,
  ) {
    super(matchRepository);
  }

  onModuleInit() {
    this.eventBus.on(PieceAdded.type, this.onPieceAdded.bind(this));
    this.eventBus.on(StatusUpdate.type, this.onStatusUpdate.bind(this));
    this.eventBus.on(WinnerUpdate.type, this.onWinnerUpdate.bind(this));
  }

  onModuleDestroy() {
    this.eventBus.off(PieceAdded.type, this.onPieceAdded.bind(this));
    this.eventBus.off(StatusUpdate.type, this.onStatusUpdate.bind(this));
    this.eventBus.off(WinnerUpdate.type, this.onWinnerUpdate.bind(this));
  }

  public async getOpenMatches(): Promise<[Match[], number]> {
    // return Array.from(this.matches.values()).filter(match => match.status === MatchStatus.Initialized);
    return await this.matchRepository.findAndCount({ status: MatchStatus.Initialized });
  }

  async getOne(id: string): Promise<Match> {
    // return this.matches.get(id) || await this.matchRepository.findOne(id);
    if (this.matches.has(id)) {
      return this.matches.get(id);
    } else {
      const match = await this.matchRepository.findOne(id);
      if (match) this.matches.set(id, match);
      return match;
    }
  }

  async createMatch(settings: MatchSettings, user: User): Promise<Match> {
    const match = new Match();
    match.settings = settings;
    match.board = [...Array(settings.numRows)].map(e => Array(settings.numCols).fill(0));
    match.players = [
      {
        id: user.id,
        value: PlayerValue.Player1,
        role: PlayerRole.Player1,
        name: user.name,
      },
    ];
    match.status = MatchStatus.Initialized;
    try {
      const obj = this.repository.create(match);
      const newMatch = await this.repository.save(obj);
      this.matches.set(newMatch.id, newMatch);
      return newMatch;
    } catch (err /*: WriteError*/) {
      throw new BadRequestException(err);
    }
  }

  async joinMatch(id: string, user: User): Promise<Match> {
    const match = await this.getOne(id);
    if (!match) {
      throw new NotFoundException('match not found');
    }
    // already joined?
    if (match.players.some(p => p.id === user.id)) {
      return match;
    }
    // already full?
    if (match.players.length > 1) {
      throw new ConflictException('match full');
    }

    try {
      match.players[1] = {
        id: user.id,
        value: PlayerValue.Player2,
        role: PlayerRole.Player2,
        name: user.name,
      };
      match.status = MatchStatus.Active;
      this.matches.set(id, match);
      await this.matchRepository.update(id, { players: match.players, status: match.status });
      // Notify Player1
      this.eventBus.sendActionToUser({ id: match.players[0].id }, new Player2Joined({ player2: match.players[1] }));
      return match;
    } catch (err /*: WriteError*/) {
      throw new BadRequestException(err);
    }
  }

  async onPieceAdded(action: PieceAdded, user: User) {
    const {
      payload: { matchId, row, col, value },
    } = action;
    const match = await this.getOne(matchId);
    if (match) {
      match.board[row][col] = value;
      this.routeActionToOtherPlayer(match, user, action);
    } else {
      this.logger.log(`Match with ID: ${action.payload.matchId} closed for PieceAdded: ${row}, ${col}, ${value}`);
    }
  }

  async onStatusUpdate(action: StatusUpdate, user: User) {
    const { matchId, status } = action.payload;
    const match = this.matches.get(matchId); // await this.getOne(matchId);
    if (match) {
      match.status = status;
      this.routeActionToOtherPlayer(match, user, action);
      if (status === MatchStatus.Tie || status === MatchStatus.Abandoned) {
        await this.saveMatch(match);
      }
    } else {
      this.logger.log(`Match with ID: ${action.payload.matchId} closed for StatusUpdate: ${action.payload.status}`);
    }
  }

  async onWinnerUpdate(action: WinnerUpdate, user: User) {
    const { matchId, winner } = action.payload;
    const match = await this.getOne(matchId);
    if (match) {
      match.winnerPlayer = match.players.find(player => player.role === winner);
      match.status = MatchStatus.Won;
      this.routeActionToOtherPlayer(match, user, action);
      await this.saveMatch(match);
    } else {
      this.logger.log(`Match with ID: ${action.payload.matchId} closed for WinnerUpdate: ${winner}`);
    }
  }

  async saveMatch(match: Match) {
    const { board, players, settings, status, winnerPlayer } = match;
    await this.matchRepository.update(match.id, { board, players, settings, status, winnerPlayer });
    this.matches.delete(match.id);
  }

  routeActionToOtherPlayer(match: Match, user: User, action) {
    const otherPlayer = match.players.find(player => player.id !== user.id);
    if (otherPlayer) this.eventBus.sendActionToUser({ id: otherPlayer.id }, action);
  }

  // TODO : implement cron job to evict non-active matches.
}
