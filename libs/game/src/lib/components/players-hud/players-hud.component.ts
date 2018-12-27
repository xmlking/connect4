import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player, PlayerRole } from '@xmlking/models';

@Component({
  selector: 'ngx-players-hud',
  templateUrl: './players-hud.component.html',
  styleUrls: ['./players-hud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersHudComponent {
  @Input() players: Player[];

  @Input() isMyTurn: boolean;
  @Input() role: PlayerRole;

  playerRole = PlayerRole;
}
