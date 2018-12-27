import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UpdateUser, UserState } from '@xmlking/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DEFAULTS } from '../../utils/defaults';
import { GameService } from '../../services/game.service';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'ngx-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMatchComponent implements OnInit {
  user = this.store.selectSnapshot(UserState.getState);
  matchSettingsForm: FormGroup;
  constructor(private fb: FormBuilder, private gameService: GameService, private store: Store) {}

  ngOnInit() {
    this.matchSettingsForm = this.fb.group(
      {
        player1Name: [this.user.name || '', [Validators.minLength(4), Validators.maxLength(12)]],
        numRows: [DEFAULTS.boardNumRows, [Validators.required, Validators.min(6), Validators.max(12)]],
        numCols: [DEFAULTS.boardNumCols, [Validators.required, Validators.min(7), Validators.max(14)]],
        four: [DEFAULTS.four, [Validators.required, Validators.min(4), Validators.max(6)]],
        ghostHelper: [DEFAULTS.enableGhostHelper, Validators.required],
      },
      { updateOn: 'blur' },
    );
  }

  async createMatch() {
    const settings = this.matchSettingsForm.value;
    const name = settings.player1Name || DEFAULTS.player1Name;
    if (!this.user.name || this.user.name !== settings.player1Name) {
      await this.store.dispatch(new UpdateUser({ id: this.user.id, name })).toPromise();
      this.user = this.store.selectSnapshot(UserState.getState);
    }
    const match = await this.gameService.create({settings}).toPromise();
    this.store.dispatch(new Navigate([`/match/${match.id}`]));
  }
}
