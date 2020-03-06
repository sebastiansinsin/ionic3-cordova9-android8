import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class OnboardingService {
    bearer: string = null;
    paywallUrl = environment.paywall_api_url;
    constructor(
        private storage: Storage,
        private http: HttpClient
    ) {
        this.storage.get('bearer_token').then((val) => {
            this.bearer = val;
        });
    }

    getStatusOnboarding(company_id): Observable<any> {
        console.log('bearer', this.bearer);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.bearer
            })
        };
        var get_url = this.paywallUrl + 'companies/' + company_id + '/onboarding-status';

        return this.http.get(get_url, httpOptions);
    }
}
