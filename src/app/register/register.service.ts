import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    paywallUrl = environment.paywall_api_url;
    constructor(
        private http: HttpClient
    ) { }

    registerUser(users): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders()
        };
        var load_url = this.paywallUrl + "users";
        return this.http.post(load_url, users, httpOptions);
    }
}
