import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-player-name-dialog',
  templateUrl: './player-name-dialog.component.html',
  styleUrls: ['./player-name-dialog.component.scss']
})
export class PlayerNameDialogComponent {
  form: FormGroup = this.fb.group({
    playerName: [ this.data.name || '']
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private dialogRef: MatDialogRef<PlayerNameDialogComponent>,
    private fb: FormBuilder
  ) {}

  close() {
    this.dialogRef.close(this.form.value.playerName);
  }
}
