import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpModule } from '@angular/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { PublicComponent } from "./public.component";


const HOME_ROUTE = [
  { path: '', component: PublicComponent }
];

@NgModule({
  declarations: [
    PublicComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChartsModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(HOME_ROUTE)
  ]
})
export class PublicModule { }
