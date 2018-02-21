import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { AppConfig } from '../../app.config';
import { User } from '../../models/index';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private config: AppConfig) { }

    //getAll() {
    //    return this.http.get(this.config.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
    //}

    //getById(id: number) {
    //    return this.http.get(this.config.apiUrl + '/users/' + id, this.jwt()).map((response: Response) => response.json());
    //}

    //createUser(user: User) {
    //    return this.http.post(this.config.apiUrl + '/users', user, this.jwt());
    //}

    //update(user: User) {
    //    return this.http.put(this.config.apiUrl + '/users/' + user.id, user, this.jwt());
    //}

    //delete(id: number) {
    //    return this.http.delete(this.config.apiUrl + '/users/' + id, this.jwt());
    //}

    // private helper methods

    //private jwt() {
    //    // create authorization header with jwt token
    //    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //    if (currentUser && currentUser.token) {
    //        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    //        return new RequestOptions({ headers: headers });
    //    }
    //}
}
