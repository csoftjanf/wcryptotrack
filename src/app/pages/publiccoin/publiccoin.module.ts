import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PublicCoinViewComponent } from "./publiccoin.component";



const TABS_ROUTES = [
  { path: '', component: PublicCoinViewComponent }
];
const BUTTONS_COMPONENT_ROUTES = [
  { path: '', component: PublicCoinViewComponent }
]

@NgModule({
  declarations: [
    PublicCoinViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChartsModule,
    FormsModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(TABS_ROUTES),
    RouterModule.forChild(BUTTONS_COMPONENT_ROUTES)
  ]
})

export class publiccoinviewModule { }
