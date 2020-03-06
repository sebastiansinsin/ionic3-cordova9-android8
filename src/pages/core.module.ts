import {
    ErrorHandler,
    NgModule
} from "@angular/core";
import { LoadingSmallComponent } from "../pages/loading.component";
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { PaperPlanesModule } from 'paper-planes';
import { MatTabsModule } from "@angular/material/tabs";
import { NetworkProvider } from "../providers/network";
import { SentryIonicErrorHandler } from "../services/sentry-errorhandler";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { SpinnerModule } from "./spinner.module";
import { CleverTap } from '@ionic-native/clevertap/ngx';

@NgModule({
    declarations: [
        LoadingSmallComponent,
    ],
    providers: [
        { provide: ErrorHandler, useClass: SentryIonicErrorHandler },
        NetworkProvider,
        InAppBrowser,
        CleverTap
    ],
    imports: [
        CommonModule,
        PaperPlanesModule,
        MatTabsModule,
        IonicModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatIconModule,
        MatFormFieldModule,
        SpinnerModule,
    ],
    exports: [
        LoadingSmallComponent,
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
