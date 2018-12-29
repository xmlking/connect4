import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { produce as ngxsProduce } from '@ngxs-labs/immer-adapter';
import { produce } from 'immer';
import {
  AddPiece,
  PieceAdded,
  Player2Joined,
  ResetGameState,
  StatusUpdate,
  UpdateMatch,
  WinnerUpdate,
} from './game.actions';
import { Board, MatchSettings, MatchStatus, Player, PlayerRole, PlayerValue } from '@xmlking/models';
import { DEFAULTS } from '../utils/defaults';
import { GameService } from '../services/game.service';
import { SendWebSocketAction } from '@ngx-starter-kit/socketio-plugin';
import { GameUtils } from '../utils/game-utils';

export interface GameStateModel {
  id: string;
  board: Board;
  status: MatchStatus;
  inserts: number;
  role: PlayerRole;
  winnerPlayer?: Player;
  players: Player[];
  settings: MatchSettings;
  createdAt?: Date;
  updatedAt?: Date;
}

const GAME_DEFAULT_STATE: GameStateModel = {
  id: undefined,
  board: undefined,
  status: undefined,
  inserts: 0,
  role: undefined,
  winnerPlayer: undefined,
  players: undefined,
  settings: {
    numRows: DEFAULTS.boardNumRows,
    numCols: DEFAULTS.boardNumCols,
    four: DEFAULTS.four,
    ghostHelper: DEFAULTS.enableGhostHelper,
  },
};

@State<GameStateModel>({
  name: 'game',
  defaults: GAME_DEFAULT_STATE,
})
export class GameState {
  private gameUtils: GameUtils;
  constructor(private gameService: GameService, private router: Router, private zone: NgZone) {}

  @Selector()
  public static getState(state: GameStateModel) {
    return state;
  }
  @Selector()
  public static getId(state: GameStateModel) {
    return state.id;
  }
  @Selector()
  public static getStatus(state: GameStateModel) {
    return state.status;
  }
  @Selector()
  public static getSettings(state: GameStateModel) {
    return state.settings;
  }
  @Selector()
  public static getPlayers(state: GameStateModel) {
    return state.players;
  }
  @Selector()
  public static getBoard(state: GameStateModel) {
    return state.board;
  }
  @Selector()
  public static getRole(state: GameStateModel) {
    return state.role;
  }
  @Selector()
  public static getWinnerPlayer(state: GameStateModel) {
    return state.winnerPlayer;
  }

  @Selector()
  public static isMyTurn(state: GameStateModel) {
    return state.players[state.inserts % 2].role === state.role;
  }

  @Action(UpdateMatch)
  public updateMatch(ctx: StateContext<GameStateModel>, { payload }: UpdateMatch) {
    // init game-utils with match settings
    this.gameUtils = new GameUtils(payload.settings);

    const inserts = payload.board.flat().reduce((total, x) => (x !== 0 ? total + 1 : total), 0);
    ctx.patchState({ ...payload, inserts });
  }

  @Action(Player2Joined)
  public joinMatch(ctx: StateContext<GameStateModel>, { payload }: Player2Joined) {
    ngxsProduce(ctx, (draft: GameStateModel) => {
      draft.players[1] = payload.player2;
      draft.status = MatchStatus.Active;
    });
  }

  @Action(AddPiece)
  public addPiece({ getState, patchState, dispatch }: StateContext<GameStateModel>, { payload }: AddPiece) {
    const { row, col } = payload;
    const { id: matchId, players, role, inserts, board, settings } = getState();
    const value = role === PlayerRole.Player1 ? PlayerValue.Player1 : PlayerValue.Player2;
    const newBoard = this.addPieceToBoard(board, row, col, value, inserts, patchState);

    // Check winner
    const winnerValue = this.gameUtils.getWinnerValue(newBoard);
    if (winnerValue !== null) {
      const winnerPlayer = players.find(player => player.value === winnerValue);
      patchState({ winnerPlayer, status: MatchStatus.Won });
      return dispatch([
        new SendWebSocketAction(new PieceAdded({ matchId, ...payload, value })),
        new SendWebSocketAction(new WinnerUpdate({ matchId, winner: winnerPlayer.role })),
      ]);
    }
    // Check Tie
    else if (inserts + 1 === settings.numRows * settings.numCols) {
      patchState({ status: MatchStatus.Tie });
      return dispatch([
        new SendWebSocketAction(new PieceAdded({ matchId, ...payload, value })),
        new SendWebSocketAction(new StatusUpdate({ matchId, status: MatchStatus.Tie })),
      ]);
    }

    return dispatch(new SendWebSocketAction(new PieceAdded({ matchId, ...payload, value })));
  }

  @Action(PieceAdded)
  public onPieceAdded({ getState, patchState }: StateContext<GameStateModel>, { payload }: PieceAdded) {
    const { row, col, value } = payload;
    const { board, inserts } = getState();
    this.addPieceToBoard(board, row, col, value, inserts, patchState);
  }

  private addPieceToBoard(oldBoard: Board, row: number, col: number, value: PlayerValue, inserts, patchState) {
    const board = produce(oldBoard, (draft: Board) => {
      draft[row][col] = value;
    });
    patchState({ board, inserts: inserts + 1 });
    return board;
  }

  @Action(StatusUpdate)
  public onStatusUpdate({ getState, patchState }: StateContext<GameStateModel>, { payload }: StatusUpdate) {
    const { status } = payload;
    patchState({ status });
  }

  @Action(WinnerUpdate)
  public onWinnerUpdate({ getState, patchState }: StateContext<GameStateModel>, { payload }: WinnerUpdate) {
    const { winner: winnerRole } = payload;
    const { players } = getState();
    const winnerPlayer = players.find(player => player.role === winnerRole);
    patchState({ winnerPlayer, status: MatchStatus.Won });
  }

  @Action(ResetGameState)
  public onResetGameState({ setState }: StateContext<GameStateModel>) {
    setState(GAME_DEFAULT_STATE);
  }
}
