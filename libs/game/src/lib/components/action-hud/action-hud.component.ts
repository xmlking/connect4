import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatchStatus, Player, PlayerRole } from '@xmlking/models';
import * as Clipboard from 'clipboard';
import { MatButton } from '@angular/material/button';
import { environment } from '@env/environment';

@Component({
  selector: 'ngx-action-hud',
  templateUrl: './action-hud.component.html',
  styleUrls: ['./action-hud.component.scss'],
})
export class ActionHudComponent implements OnInit, AfterViewInit {
  @Input() matchId: string;
  @Input() role: PlayerRole;
  @Input() status: MatchStatus;
  readonly MatchStatus = MatchStatus;
  readonly PlayerRole = PlayerRole;
  @ViewChild('copyLinkBtn') copyLinkBtn: MatButton;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.copyLinkBtn) {
      const clipboard = new Clipboard(this.copyLinkBtn._getHostElement(), {
        text: () => `${environment.BASE_URL}/match/${this.matchId}`,
      });
    }
  }

  playAgain() {
    console.log('TODO: playAgain');
  }
}
