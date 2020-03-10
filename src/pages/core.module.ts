import {
    ErrorHandler,
    NgModule
} from "@angular/core";
import { LoadingSmallComponent } from "../pages/loading.component";
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { CurrencyService } from "../providers/currency-service";
import { CurrencyPipe } from "../pipes/currency-pipe";
import { CapitalizePipe } from "../pipes/capitalize.pipe";
import { PaperPlanesModule } from 'paper-planes';
import { MatTabsModule } from "@angular/material/tabs";
import { PaperHttp } from "../services/paper-http.service";
import { AuthenticationService } from "../providers/auth-service";
import { NetworkProvider } from "../providers/network";
import { SharedService } from "../providers/shared.service";
import { DateConverterService } from "../services/date-converter.service";
import { HttpHandlerService } from "../providers/http-handler-service";
import { SalesPersonService } from "../providers/sales-person.service";
import { SentryIonicErrorHandler } from "../services/sentry-errorhandler";
import { SocketService } from "../services/socket.service";
import { HttpModule, XHRBackend, RequestOptions } from "@angular/http";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SearchPipe } from "../pipes/search.pipe";
import { OrderByPipe } from "../pipes/order-by.pipe";
import { filterPipe } from "../pipes/filter-pipe";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { SpinnerModule } from "./spinner.module";
import { CleverTap } from '@ionic-native/clevertap/ngx';
import { ENV } from '../environments/environment';
import { SocketIoModule, SocketIoConfig } from "ng-socket-io";

import * as Sentry from 'sentry-cordova';
const isProduction = ENV.production;
if (isProduction) {
    Sentry.init({ dsn: 'https://a9fc3d8bd281440b8e8f2417ceb47dc6@sentry.io/1319331' });
} else {
    Sentry.init({ dsn: 'https://564a4476778a427abd8db81d205215cc@sentry.io/1311993' });
}

const config: SocketIoConfig = {
    url: ENV.gateway_url,
    options: {
        // transports: ["websocket", "polling", "long-polling"],
        // rejectUnauthorized: false
    }
};

export function httpFactory(
    backend: XHRBackend,
    options: RequestOptions,
    httpHandlerService: HttpHandlerService,
    auth: AuthenticationService
) {
    return new PaperHttp(backend, options, httpHandlerService, auth);
}
@NgModule({
    declarations: [
        OrderByPipe,
        SearchPipe,
        filterPipe,
        //spinner
        //loading small
        LoadingSmallComponent,
        CurrencyPipe,
        CapitalizePipe,
    ],
    providers: [
        CurrencyService,
        CurrencyPipe,
        CapitalizePipe,
        {
            provide: PaperHttp,
            useFactory: httpFactory,
            deps: [
                XHRBackend,
                RequestOptions,
                HttpHandlerService,
                AuthenticationService,
                NetworkProvider
            ]
        },
        SocketService,
        { provide: ErrorHandler, useClass: SentryIonicErrorHandler },
        AuthenticationService,
        NetworkProvider,
        SharedService,
        DateConverterService,
        HttpHandlerService,
        SalesPersonService,
        InAppBrowser,
        CleverTap
    ],
    imports: [
        HttpModule,
        CommonModule,
        PaperPlanesModule,
        MatTabsModule,
        IonicModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatIconModule,
        MatFormFieldModule,
        SpinnerModule,
        SocketIoModule.forRoot(config),
    ],
    exports: [
        OrderByPipe,
        SearchPipe,
        filterPipe,
        //spinner
        //loading small
        LoadingSmallComponent,
        // CurrencyService,
        CurrencyPipe,
        CapitalizePipe,
        PaperPlanesModule,
        MatTabsModule,
        CommonModule,
        IonicModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatIconModule,
        MatFormFieldModule,
        MatExpansionModule,
        SpinnerModule,
    ]
})
export class CoreModule { }
