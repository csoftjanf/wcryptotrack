import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { LoginComponent } from "./login.component";


const HOME_ROUTE = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(HOME_ROUTE)
  ]
})
export class LoginModule { }
