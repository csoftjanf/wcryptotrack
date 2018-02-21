import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SparklineDirective } from "./directives/sparklines/sparkline.directive";

@NgModule ({
  declarations: [
    // Directives
    SparklineDirective

  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    // Directives
    SparklineDirective
   
  ]
})

export class SharedModule {  }
