import { Match, MatchStatus, Player, PlayerRole, PlayerValue } from '@xmlking/models';

export class UpdateMatch {
  public static readonly type = '[Game] UpdateMatch';
  constructor(public payload: Match & { role: PlayerRole }) {}
}

export class AddPiece {
  static readonly type = '[Game] AddPiece';
  constructor(public readonly payload: { row: number; col: number }) {}
}

export class ResetGameState {
  static readonly type = '[Game] ResetGameState';
}

// WS Events

export class Player2Joined {
  static readonly type = '[Game] Player2Joined';
  constructor(public readonly payload: { player2: Player }) {}
}

export class PieceAdded {
  static readonly type = '[Game] PieceAdded';
  constructor(public readonly payload: { matchId: string; row: number; col: number; value: PlayerValue }) {}
}

export class StatusUpdate {
  static readonly type = '[Game] StatusUpdate';
  constructor(public readonly payload: { matchId: string; status: MatchStatus }) {}
}

export class WinnerUpdate {
  static readonly type = '[Game] WinnerUpdate';
  constructor(public readonly payload: { matchId: string; winner: PlayerRole }) {}
}
