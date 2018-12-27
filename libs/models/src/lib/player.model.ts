import { PlayerValue } from './player-value.enum';
import { PlayerRole } from './player-role.enum';

/**
 * Player state representation
 */
export interface Player {
  /**
   * Player GUID
   */
  id: string;

  /**
   * Nothing but a useless nickname
   */
  name: string;

  /**
   * Mark value used by this player
   */
  value: PlayerValue;

  /**
   * Player's role: host (Player1) or guest (Player2)
   */
  role: PlayerRole;
}
