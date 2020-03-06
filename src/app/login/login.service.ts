import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../interface/user';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    authUrl = environment.auth_url;
    paperUrl = environment.main_api_url;
    paywallUrl = environment.paywall_api_url;
    constructor(
        private http: HttpClient
    ) { }

    postLogin(user): Observable<User> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        const creds = "email=" + user.email + "&password=" + user.password;
        const load_url = this.paywallUrl + "users/login";
        return this.http
            .post<User>(load_url, creds, httpOptions);
    }
}
