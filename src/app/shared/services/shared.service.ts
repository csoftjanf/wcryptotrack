import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

  ClientNo: number = 3;
  UserNo: number = 3;

  WebServiceURL = "http://localhost:50561/";//"http://wtservices202.azurewebsites.net/";

  // Sidebar visibility
  sidebarVisible: boolean
  sidebarVisibilitySubject: Subject<boolean> = new Subject<boolean>()

  toggleSidebarVisibilty() {
    this.sidebarVisible = !this.sidebarVisible
    this.sidebarVisibilitySubject.next(this.sidebarVisible)
  }

  // Theming
  maTheme: string
  maThemeSubject: Subject<string> = new Subject<string>()

  setTheme(color) {
    this.maTheme = color
    this.maThemeSubject.next(this.maTheme)
  }

  constructor() {
    // Hidden the sidebar by default
    this.sidebarVisible = false;

    // Set default theme as green
    this.maTheme = 'blue';
  }

}
