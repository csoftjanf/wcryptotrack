import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { RegisterComponent } from "./register.component";


const HOME_ROUTE = [
  { path: '', component: RegisterComponent }
];

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(HOME_ROUTE)
  ]
})
export class RegisterModule { }
