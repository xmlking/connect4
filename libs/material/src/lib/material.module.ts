import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatSlideToggleModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatListModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatDialogModule,
} from '@angular/material';

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
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule {}
