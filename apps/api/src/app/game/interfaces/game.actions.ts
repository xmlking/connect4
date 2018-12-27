import { MatchStatus, Player, PlayerRole, PlayerValue } from '@xmlking/models';

// Actions

// Events

export class PieceAdded {
  static readonly type = '[Game] PieceAdded';
  constructor(public readonly payload: { matchId: string; row: number; col: number; value: PlayerValue }) {}
}

export class WinnerUpdate {
  static readonly type = '[Game] WinnerUpdate';
  constructor(public readonly payload: { matchId: string; winner: PlayerRole }) {}
}

export class StatusUpdate {
  static readonly type = '[Game] StatusUpdate';
  constructor(public readonly payload: { matchId: string; status: MatchStatus }) {}
}

export class Player2Joined {
  static readonly type = '[Game] Player2Joined';
  constructor(public readonly payload: { player2: Player }) {}
}
