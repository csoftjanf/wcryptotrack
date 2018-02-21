import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SharedService } from "./shared/services/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  title = 'Crypto 1.0';

  private sService: SharedService;

  constructor(private sharedService: SharedService, private router: Router) {
    this.sService = sharedService;
    
  }

  ngOnInit() {

    this.router.navigate(['./login']);
    //this.router.navigate(['./public']);

    //this.router.navigate(['./crypto'])
    //this.router.navigate(['./profile'])
  }

}
