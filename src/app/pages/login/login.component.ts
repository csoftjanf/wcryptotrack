import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { RouterModule, Router } from '@angular/router';

import { GenScreenInfo } from '../../models/GenScreenInfo';
import { mdlProfile } from "../../models/Profile";
import { UserAuth } from "../../models/user";
import { CoinViewData } from '../../models/Crypto';

import { srvServerData } from "../../shared/services/screeninfo.service";
import { SharedService } from "../../shared/services/shared.service";
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public genscreeninfo: GenScreenInfo;
  private sService: SharedService;
  public _UserAuth: UserAuth;

  public UpdateDate: string;

  model: any = {};
  loading = false;
  returnUrl: string;

  ErrorMessage: string;

  constructor(
    private sharedService: SharedService,
    private serverdata: srvServerData,
    private router: Router,
    private alertService: AlertService) {
    this.sService = sharedService;
  }

  ngOnInit() {

    // if login
    this.sService.sidebarVisible = false;


   // if skip login
    //this.loading = true;
    //this.serverdata.login('janf', '123')
    //  .subscribe(
    //  data => {
    //    this.loading = false;
    //    this._UserAuth = data;

    //    localStorage.setItem('currentUser', JSON.stringify(data));

    //    this.sharedService.toggleSidebarVisibilty();
    //    this.router.navigate(['/crypto']);

    //  },
    //  error => {
    //    this.ErrorMessage = 'Username or password is incorrect';
    //    this.loading = false;
    //  });
  }

  login() {
    this.loading = true;
    this.serverdata.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        this.loading = false;
        this._UserAuth = data;

        localStorage.setItem('currentUser', JSON.stringify(data));

        this.sharedService.toggleSidebarVisibilty();
        this.router.navigate(['/crypto']);

      },
      error => {
        this.ErrorMessage = 'Username or password is incorrect';

        this.loading = false;
      });
  }



}
