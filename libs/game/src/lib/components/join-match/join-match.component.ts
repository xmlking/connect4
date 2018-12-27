import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, Subject, timer } from 'rxjs';
import { Match } from '@xmlking/models';
import { UpdateUser, UserState } from '@xmlking/core';
import { Store } from '@ngxs/store';
import { GameService } from '../../services/game.service';
import { MatDialog } from '@angular/material';
import { untilDestroy } from '@ngx-starter-kit/ngx-utils';
import { concatMap, tap } from 'rxjs/operators';
import { PlayerNameDialogComponent } from '../player-name-dialog/player-name-dialog.component';
import { DEFAULTS } from '../../utils/defaults';
import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { Navigate } from '@ngxs/router-plugin';

export const listFadeAnimation = trigger('listFade', [
  transition(':leave', [
    style({ height: '*', opacity: '1', transform: 'translateX(0)' }),
    sequence([
      animate('250ms ease', style({ height: '*', opacity: 0, transform: 'translateX(50px)' })),
      animate('100ms ease', style({ height: '0', opacity: 0, transform: 'translateX(50px)' })),
    ]),
  ]),
  transition(':enter', [
    style({ height: '0', opacity: '0', transform: 'translateX(50px)' }),
    animate('350ms 350ms ease', style({ height: '*', opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

@Component({
  selector: 'ngx-join-match',
  templateUrl: './join-match.component.html',
  styleUrls: ['./join-match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [listFadeAnimation],
})
export class JoinMatchComponent implements OnInit, OnDestroy {
  isLoading$ = this.gameService.isLoading$;
  private manualRefresh = new Subject();
  polledOpenMatches$: Observable<Partial<Match>[]>;
  user = this.store.selectSnapshot(UserState.getState);
  constructor(private store: Store, private gameService: GameService, private dialog: MatDialog) {}

  ngOnInit() {
    this.polledOpenMatches$ = merge(this.manualRefresh, timer(0, 10000)).pipe(
      untilDestroy(this),
      concatMap(_ => this.gameService.getOpenMatches()),
      tap(xyz => console.log(xyz)),
    );
  }

  ngOnDestroy() {}

  async joinMatch(matchId) {
    // prompt player 2 to get his nickname
    const name =
      (await this.dialog
        .open(PlayerNameDialogComponent, { data: { name: this.user.name } })
        .afterClosed()
        .toPromise()) || DEFAULTS.player2Name;
    if (!this.user.name || this.user.name !== name) {
      await this.store.dispatch(new UpdateUser({ id: this.user.id, name })).toPromise();
      this.user = this.store.selectSnapshot(UserState.getState);
    }
    this.store.dispatch(new Navigate([`/match/${matchId}`]));
  }

  trackById(index: number, item: Match) {
    return item.id;
  }
  refreshOpenMatches() {
    this.manualRefresh.next(1);
  }
}
