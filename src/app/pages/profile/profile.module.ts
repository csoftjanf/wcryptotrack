import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProfileComponent } from "./profile.component";

const TABS_ROUTES = [
  { path: '', component: ProfileComponent }
];
const BUTTONS_COMPONENT_ROUTES = [
  { path: '', component: ProfileComponent }
]

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(TABS_ROUTES),
    ButtonsModule.forRoot(),
    RouterModule.forChild(BUTTONS_COMPONENT_ROUTES)
  ]
})

export class ProfileModule { }
