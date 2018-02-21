import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { RouterModule, Router } from '@angular/router';

import { SharedService } from "../../shared/services/shared.service";


@Component({
  selector: 'app-home',
  template: ''
})

export class LogoutComponent implements OnInit {


  private sService: SharedService;

  constructor(private sharedService: SharedService,
    private router: Router) {
    this.sService = sharedService;
  }

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.sharedService.toggleSidebarVisibilty();
    this.router.navigate(['/public'])
  }
}
