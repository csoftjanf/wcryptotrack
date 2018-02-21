import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DashbCryptoComponent } from "./dashbcrypto.component";
import { Select2Module } from 'ng2-select2';


const TABS_ROUTES = [
  { path: '', component: DashbCryptoComponent }
];
const BUTTONS_COMPONENT_ROUTES = [
  { path: '', component: DashbCryptoComponent }
]

@NgModule({
  declarations: [
    DashbCryptoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChartsModule,
    FormsModule,
    Select2Module,
    TooltipModule.forRoot(),
    RouterModule.forChild(TABS_ROUTES),
    RouterModule.forChild(BUTTONS_COMPONENT_ROUTES)
  ]
})

export class DashbcryptoModule { }
