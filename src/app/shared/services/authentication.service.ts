import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../../app.config';
import { User } from '../../models/user'
@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private config: AppConfig) { }

    private user: User;

    login(username: string, password: string): Observable<any> {
      console.log("user : " + username);
      console.log("psw : " + password);
      console.log(this.config.apiUrl + '/api/users/authenticate');

      return this.http.post(this.config.apiUrl + '/api/crypto/authenticate', { username: username, password: password })

            //.map((response: Response) => {
            //    // login successful if there's a jwt token in the response
            //    let user = response.json();
            //    if (user && user.token) {
            //        // store user details and jwt token in local storage to keep user logged in between page refreshes
            //        localStorage.setItem('currentUser', JSON.stringify(user));
            //    }
            //});
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
