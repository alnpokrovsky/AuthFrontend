import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
 } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class MaterialModule {}
