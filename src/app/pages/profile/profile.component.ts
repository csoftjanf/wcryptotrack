import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { GenScreenInfo } from '../../models/GenScreenInfo';
import { mdlProfile } from "../../models/Profile";
import { User, UserAuth } from '../../models/user';

import { srvServerData } from "../../shared/services/screeninfo.service";
import { SharedService } from "../../shared/services/shared.service";


@Component({
  selector: 'app-home',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {

  maskDate: any = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  public currentUser: User;

  public loading = false;

  public profile: mdlProfile;
  public genscreeninfo: GenScreenInfo;

  public UpdateResult: string = "";

  private riskprof1: string;
  private riskprof2: string;

  constructor(
    private sharedService: SharedService,
    private serverdata: srvServerData) {

  }

  ngOnInit() {

    this.profile = new mdlProfile()

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.profile.firstname = "";
    this.profile.lastname = "";

    this.serverdata.GetProfile(this.currentUser.tokenString).subscribe(data => {
      this.profile = data;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );

  }

  updateItem() {

    this.loading = true;

    this.serverdata.UpdateProfile(this.profile).subscribe(data => {
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
    this.loading = false;

  }

}


