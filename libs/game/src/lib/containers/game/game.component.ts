import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../../services/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { untilDestroy } from '@ngx-starter-kit/ngx-utils';
import { Board, MatchSettings, MatchStatus, Player, PlayerRole } from '@xmlking/models';
import { GameState } from '../../store/game.state';
import { switchMap, tap } from 'rxjs/operators';
import { AddPiece, ResetGameState, StatusUpdate, UpdateMatch } from '../../store/game.actions';
import { UpdateUser, UserState } from '@xmlking/core';
import { Navigate } from '@ngxs/router-plugin';
// import { PlayerNameDialogComponent } from '../../components/player-name-dialog/player-name-dialog.component';
import { DEFAULTS } from '../../utils/defaults';
import { SendWebSocketAction } from '@ngx-starter-kit/socketio-plugin';

@Component({
  selector: 'ngx-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  loading: boolean;
  readonly MatchStatus = MatchStatus;
  user = this.store.selectSnapshot(UserState.getState);

  @Select(GameState.getId) id$: Observable<string>;
  @Select(GameState.getBoard) board$: Observable<Board>;
  @Select(GameState.getSettings) settings$: Observable<MatchSettings>;
  @Select(GameState.getWinnerPlayer) winnerPlayer$: Observable<Player>;
  @Select(GameState.getPlayers) players$: Observable<Player[]>;
  @Select(GameState.getStatus) status$: Observable<MatchStatus>;
  @Select(GameState.getRole) role$: Observable<PlayerRole>;
  @Select(GameState.isMyTurn) isMyTurn$: Observable<boolean>;

  constructor(
    private store: Store,
    private gameService: GameService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.loading = true;
    await this.handleAnonymousPlayer2();
    this.route.params
      .pipe(
        untilDestroy(this),
        switchMap(({ id }) => this.gameService.join(id)),

        tap(match => {
          const role = match.players[0].id === this.user.id ? PlayerRole.Player1 : PlayerRole.Player2;
          this.store.dispatch(new UpdateMatch({ ...match, role }));
        }),
      )
      .subscribe(
        match => {
          this.loading = false;
        },
        error => {
          // match does not exist, redirect
          this.loading = false;
          console.log(error);
          this.store
            .dispatch(new Navigate(['/']))
            .subscribe(_ => this.snack.open('match does not exist', 'OK', { duration: 10000 }));
        },
      );
  }

  onMark({ row, col }: { row: number; col: number }): void {
    this.store.dispatch(new AddPiece({ row, col }));
  }

  async handleAnonymousPlayer2() {
    // if user navigated directly via copy/past and opened match URL &
    // if user new and dont have `nickname`, then prompt player2 to get his nickname
    if (!this.user.name) {
      const name = window.prompt('Player2 Nickname?') || DEFAULTS.player2Name;
      // FIXME: https://github.com/angular/material2/issues/5268
      // const name =
      //   (await this.dialog
      //     .open(PlayerNameDialogComponent, { data: { name: '' } })
      //     .afterClosed()
      //     .toPromise()) || DEFAULTS.player2Name;
      await this.store.dispatch(new UpdateUser({ id: this.user.id, name })).toPromise();
      this.user = this.store.selectSnapshot(UserState.getState);
    }
  }

  ngOnDestroy() {
    if (this.store.selectSnapshot(GameState.getStatus) === MatchStatus.Active) {
      const matchId = this.store.selectSnapshot(GameState.getId);
      this.store.dispatch(new SendWebSocketAction(new StatusUpdate({ matchId, status: MatchStatus.Abandoned })));
    }
    // this.store.reset({})
    this.store.dispatch(new ResetGameState());
  }
}
