import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { FirebaseAnalyticsOriginal } from '@ionic-native/firebase-analytics';
// import { Store, State } from '@ngrx/store';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ENV } from '../environments/environment';
import { PaperHttp } from './../services/paper-http.service';

@Injectable()
export class CurrencyService {
    currency_data: any;
    paperUrl = ENV.main_api_url;

    constructor(
        public http: PaperHttp,
        public firebase: FirebaseAnalyticsOriginal,
    ) {
        this.currency_data = null;
    }

    load(): Observable<any> {

        var load_url = this.paperUrl + 'currency';
        return this.http.get(load_url).map(this.extractData);

    }
    get(currency_id) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var bearer = localStorage.getItem('bearer_token');
        headers.append('Authorization', bearer);

        var options = new RequestOptions({ headers: headers });
        var load_url = this.paperUrl + 'currency/' + currency_id;

        return this.http.get(load_url, options).map(this.extractData);
    }


    private extractData(res: Response) {
        let body = res.json();
        console.log('response from client server');
        console.debug(body);
        return body || {};
    }
}
