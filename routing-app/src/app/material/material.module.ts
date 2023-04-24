import { NgModule } from '@angular/core';

import { MatSlideToggleModule } from "@angular/material/slide-toggle"

const MaterialComponents = [
  MatSlideToggleModule,
]

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
