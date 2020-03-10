import { Component, ViewChild } from "@angular/core";
import { FirebaseAnalyticsOriginal } from "@ionic-native/firebase-analytics";
import { App, NavController, Platform, Slides, ToastController } from "ionic-angular";
import { AuthenticationService } from "../../providers/auth-service";
import { SharedService } from "../../providers/shared.service";
import { setScreenAnalytics } from "../../util/util";
import { HomePage } from "../home/home.component";
import { Login } from "../login/login.component";
import { MaintenanceComponent } from "../maintenance/maintenance.component";
import { RegisterComponent } from "../register/register.component";

@Component({
    selector: "welcome-component",
    templateUrl: "welcome.component.html"
})
export class WelcomeComponent {
    @ViewChild(Slides) slides: Slides;
    login: any;
    register: any;
    dashboard: any;
    splash = true;
    isLogged: boolean = this.auth.isLogged();

    registerBackButton: Function;

    constructor(
        public platform: Platform,
        public auth: AuthenticationService,
        public navCtrl: NavController,
        public sharedService: SharedService,
        public toastCtrl: ToastController,
        public firebase: FirebaseAnalyticsOriginal,
        public app: App
    ) {
        this.login = Login;
        this.register = RegisterComponent;
        this.dashboard = HomePage;
        this.auth.loadApplicationStatus().subscribe(status => {

            if (!status.status) {

                this.navCtrl.setRoot(MaintenanceComponent);
                console.log("maintenance status:", status);
            }
        });
    }

    ionViewDidEnter() {
        this.registerBackButton = this.sharedService.registerBackButton;
        this.registerBackButton(
            this.platform,
            this.navCtrl,
            this.toastCtrl,
            "WelcomeComponent",
            this.app
        );

        setScreenAnalytics("welcome_open", this.firebase);


    }
    goToSlide() {
        this.slides.slideTo(2, 500);
    }

    ionViewDidLoad() {
        setTimeout(() => {
            this.splash = false;
        }, 4000);
    }

    setRoot() {
        this.navCtrl.setRoot(HomePage);
    }
}
