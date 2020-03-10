import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import {
    NgModule,
} from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SocialSharing } from "@ionic-native/social-sharing";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { Contacts } from "@ionic-native/contacts";
import { FileOpener } from "@ionic-native/file-opener";
import { Network } from "@ionic-native/network";
import { EmailComposer } from "@ionic-native/email-composer";
import { ImagePicker } from "@ionic-native/image-picker";

//other
import { MyApp } from "./app.component";
import { WelcomeComponent } from "../pages/welcome/welcome.component";
import { ChartsModule } from "ng2-charts";
import { zendeskService } from "../services/zendesk.service";
import { NgProgressModule } from "ng2-progressbar"
import { CoreModule } from './../pages/core.module';
import { GetApiValidatorService } from "../services/get-api-validator.service";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Clipboard } from '@ionic-native/clipboard';
import { Device } from '@ionic-native/device';
import { SettingEmailService } from "../providers/email-settings.service";
import { AppVersion } from "@ionic-native/app-version";

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        // HttpClientModule,
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        ChartsModule,
        NgProgressModule,
        // NgxChartsModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: "",
            iconMode: "ios",
            modalEnter: "modal-slide-in",
            modalLeave: "modal-slide-out",
            tabsPlacement: "bottom",
            pageTransition: "ios-transition",
            scrollPadding: false,
            scrollAssist: false, // Valid options appear to be [true, false]
            autoFocusAssist: "delay" // Valid options appear to be ['instant', 'delay', false],

        }),
        CoreModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        //app
        MyApp
    ],
    providers: [
        Device,
        GetApiValidatorService,
        GoogleAnalytics,
        Clipboard,
        SettingEmailService,
        StatusBar,
        SplashScreen,
        SocialSharing,
        Network,
        FileTransfer,
        FileTransferObject,
        File,
        FileOpener,
        ImagePicker,
        Contacts,
        EmailComposer,
        AppVersion,
        zendeskService
    ]
})
export class AppModule { }
