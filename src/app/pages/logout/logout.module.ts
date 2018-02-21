import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
//import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
//import { Select2Module } from 'ng2-select2';
//import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { LogoutComponent } from "./logout.component";


const HOME_ROUTE = [
  { path: '', component: LogoutComponent }
];

@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    //FormsModule,
    //TooltipModule.forRoot(),
    RouterModule.forChild(HOME_ROUTE)
  ]
})
export class LogoutModule { }
