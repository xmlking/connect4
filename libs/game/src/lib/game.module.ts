import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DateFnsModule, NgLetModule } from '@ngx-starter-kit/ngx-utils';
import { MaterialModule } from '@xmlking/material';
import { PlayerNameDialogComponent } from './components/player-name-dialog/player-name-dialog.component';
import { PlayersHudComponent } from './components/players-hud/players-hud.component';
import { BoardComponent } from './components/board/board.component';
import { GameComponent } from './containers/game/game.component';
import { GameServiceModule } from './services/game-service.module';
import { ActionHudComponent } from './components/action-hud/action-hud.component';
import { GameLayoutComponent } from './containers/game-layout/game-layout.component';
import { StartComponent } from './containers/start/start.component';
import { GameHandler } from './store/game.handler';
import { GameState } from './store/game.state';
import { CreateMatchComponent } from './components/create-match/create-match.component';
import { JoinMatchComponent } from './components/join-match/join-match.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    DateFnsModule,
    NgLetModule,
    FlexLayoutModule,
    // FlexLayoutModule.withConfig({ useColumnBasisZero: false }),
    GameServiceModule,
    NgxsModule.forFeature([GameState]),
    RouterModule.forChild([
      {
        path: '',
        component: GameLayoutComponent,
        children: [
          { path: '', component: StartComponent },
          { path: 'match/:id', component: GameComponent }
        ]
      }
    ])
  ],
  declarations: [
    GameLayoutComponent,
    StartComponent,
    GameComponent,
    PlayerNameDialogComponent,
    PlayersHudComponent,
    BoardComponent,
    ActionHudComponent,
    CreateMatchComponent,
    JoinMatchComponent
  ],
  exports: [GameComponent],
  entryComponents: [PlayerNameDialogComponent]
})
export class GameModule {
  // HINT: GameHandler is injected here to initialize it as Module Run Block
  constructor(gameHandler: GameHandler) {}
}
