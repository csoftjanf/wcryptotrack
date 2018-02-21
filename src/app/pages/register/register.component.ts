import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";

import { AlertService } from '../../shared/services/alert.service';
import { SharedService } from "../../shared/services/shared.service";
import { srvServerData } from "../../shared/services/screeninfo.service";
import { User } from '../../models/user';


@Component({
  selector: 'app-home',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    public model: User;
    public loading = false;
    private sService: SharedService;

    constructor(
      private sharedService: SharedService,
      private serverdata: srvServerData,
      private router: Router,
      private alertService: AlertService) {
      this.sService = sharedService;
    }

    ngOnInit() {
       this.model = new User();
    }
  
    register() {
      this.loading = true;

      this.serverdata.createUser(this.model).subscribe(res => {
        console.log("Create user");
        //this.router.navigate(['/login']);
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

}
