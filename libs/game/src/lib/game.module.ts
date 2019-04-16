import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DateFnsModule, NgLetModule } from '@ngx-starter-kit/ngx-utils';
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

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatTooltipModule,
  MatInputModule,
  MatSlideToggleModule,
  MatListModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressBarModule
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
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
