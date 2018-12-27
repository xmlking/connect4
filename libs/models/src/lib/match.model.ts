import { Board } from './board.model';
import { Player } from './player.model';
import { MatchSettings } from './match-settings.model';
import { MatchStatus } from './match-status.enum';

export interface Match {
  id: string;
  board: Board;
  settings: MatchSettings;
  players: Player[];
  status: MatchStatus;
  winnerPlayer?: Player;
  createdAt?: Date;
  updatedAt?: Date;
}
