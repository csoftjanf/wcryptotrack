import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { SharedService } from "./shared/services/shared.service";
import { srvServerData } from "./shared/services/screeninfo.service";

import { AlertService } from './shared/services/alert.service';
import { AppConfig } from './app.config';

import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    //HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    routing
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    srvServerData,
    SharedService,
    AppConfig,
    AlertService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
