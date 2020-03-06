import { Component, ViewChild } from "@angular/core";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics";
import { App, NavController, Platform, Slides, ToastController } from "ionic-angular";
import { setScreenAnalytics } from "../../util/util";

@Component({
    selector: "welcome-component",
    templateUrl: "welcome.component.html"
})
export class WelcomeComponent {
    @ViewChild(Slides) slides: Slides;
    splash = true;
    registerBackButton: Function;

    constructor(
        public platform: Platform,
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        public firebase: FirebaseAnalytics,
        public app: App
    ) {
    }

    ionViewDidEnter() {
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

}
