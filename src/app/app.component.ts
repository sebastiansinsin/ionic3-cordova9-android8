import { Component, ViewChild } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version";
import { Clipboard } from '@ionic-native/clipboard';
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics";
import { Network } from "@ionic-native/network";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import CryptoJS from "crypto-js";
import { AlertController, App, Events, LoadingController, ModalController, Nav, Platform, PopoverController, ToastController } from "ionic-angular";
import * as moment from "moment";
import { NgProgressService } from 'ng2-progressbar';
import { Observable, Subject } from "rxjs/Rx";
import { WelcomeComponent } from "../pages/welcome/welcome.component";
import { NetworkProvider } from "../providers/network";
import { isProduction, setEventAnalytics, setScreenAnalytics, setUserIdAnalytics } from "../util/util";

declare var UserExperior: any;

// declare var KochavaTracker: any;
@Component({
    selector: "app-component",
    templateUrl: "app.html"
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = WelcomeComponent;

    isFourground: boolean = true;
    production = isProduction;
    isLoading: boolean = true;
    socket_get_status$: any;
    loader: any;
    connectionError: any = {
        title: "Koneksi Gagal",
        subTitle: "Tolong Periksa Koneksi Internet Anda..",
        buttons: [{
            text: "Coba Lagi",
            handler: () => {
                this.cekNetwork();
                let ceknet = localStorage.getItem("connection-error");
                if (ceknet == '0') this.pService.start();
                console.log("Try Again", ceknet);
            }
        }],
        cssClass: "dangerAlert"
    };
    showToast;

    toastConnection;
    users;
    profile: any = [{
        name: '',
        email: '',
        phone: '',
        package: '',
        role: ''
    }];
    referral_code = '';

    private ngUnsubscribe = new Subject();


    onConnectSub: any;
    onDisconnectSub: any;

    registerBackButton: Function;
    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public network: Network,
        public events: Events,
        public networkProvider: NetworkProvider,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public firebase: FirebaseAnalytics,
        public appVersion: AppVersion,
        public loadingController: LoadingController,
        private pService: NgProgressService,
        private toastCtrl: ToastController,
        public app: App,
        private clipboard: Clipboard,
        public popoverCtrl: PopoverController,
    ) {

        this.initializeApp();
    }
    ionViewDidEnter() {
        this.platform.registerBackButtonAction(() => {
            const overlayView = this.app._appRoot._overlayPortal._views[0];
            let updated = localStorage.getItem("updated");
            if (overlayView && overlayView.dismiss && updated != '1') {
                overlayView.dismiss();
            }
        }, 1);
    }

    initializeApp() {
        console.log("InitailizeApp");
        this.cekNetwork();

        this.loader = this.loadingController.create({
            content: "<span style='color:#ffffff;'>Connecting...</span>",
            showBackdrop: true
        });



        this.platform.resume.subscribe((res: any) => {
            this.isFourground = true;
            if (isProduction) {
                setEventAnalytics("resume_app", this.firebase);
            }
            if (this.onConnectSub) {
                this.onConnectSub.unsubscribe();
                this.onConnectSub = undefined;
            }
            if (this.onDisconnectSub) {
                this.onDisconnectSub.unsubscribe();
                this.onDisconnectSub = undefined;
            }
            this.onDisconnectSub = this.network.onDisconnect().subscribe(() => {
                setTimeout(() => {
                    console.log("Disconnected");
                    let notConnect = true;
                    this.network.type === "none";
                    let connectionErrorLocal = localStorage.getItem("connection-error");
                    let connectionError = parseInt(connectionErrorLocal);
                    if (this.isFourground && notConnect && connectionError) {
                        // const alert = this.alertCtrl.create(this.connectionError);
                        // alert.present();
                        // this.presentToast();
                    }
                    localStorage.setItem("connection-error", "0");
                }, 1000);
            });
            this.onConnectSub = this.network.onConnect().subscribe(() => {
                console.log("Connected");
                localStorage.setItem("connection-error", "1");
            });
        }, (err: any) => {
            console.log("error 2", err);
        });
        window.addEventListener('beforeunload', () => {
            setEventAnalytics("exit_app", this.firebase);
        });
        this.platform.pause.subscribe((res: any) => {
            if (isProduction) {
                setEventAnalytics("pause_app", this.firebase);
            }
            this.isFourground = false;
        });
        this.platform.ready().then(() => {
            this.splashScreen.hide();
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString('#3D99D4');//styleBlackOpaque();

            if (this.platform.is('cordova')) {
                console.log("this platform", this.platform);

                if (isProduction) {
                    UserExperior.startRecording("ba25d108-9261-4098-bdbc-41b8dek47645");
                } else {
                    UserExperior.startRecording("5d9k15ca-743b-4656-840b-5ebg1b5g6969");
                }
            }


        }).catch((err) => {
            this.splashScreen.hide();
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString('#3D99D4');//styleBlackOpaque();
            this.doOnReady();
        });
    }

    ngOnInit() {

    }

    cekNetwork() {
        this.networkProvider.initializeNetworkEvents();


        // Offline event
        this.events.subscribe('network:offline', () => {

            let notConnect = true;
            this.network.type === "none";
            console.log('network:offline ==> ' + this.network.type);
            // let connectionErrorLocal = localStorage.getItem("connection-error");
            // let connectionError = parseInt(connectionErrorLocal);

            if (this.isFourground && notConnect) {
                // const alert = this.alertCtrl.create(this.connectionError);
                // alert.present();
                // this.pService.start();

                this.showToast = Observable.interval(5000).subscribe(x => {
                    // this.presentToast();
                    this.presentToast();
                    this.showToast.unsubscribe();
                });

                console.log("this toas show Disconnect", this.showToast);


            }
            localStorage.setItem("connection-error", "0");
        });

        // Online event
        this.events.subscribe('network:online', () => {
            console.log('network:online ==> ' + this.network.type);
            localStorage.setItem("connection-error", "1");
            // this.loader.dismiss();
            this.pService.done();
            console.log("this toas show Conenct", this.showToast);
            if (this.showToast.closed == false) {
                this.showToast.unsubscribe();
            }
            // this.presentToast();

        });
    }

    presentToast() {

        let toast = this.toastCtrl.create({
            message: 'Koneksi gagal. Harap periksa koneksi internet anda',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: "Coba Lagi",
            cssClass: 'toast-network'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
            let ceknet = localStorage.getItem("connection-error");
            console.log("cek network", ceknet);
            if (ceknet == '0') this.pService.start();
        });

        toast.present();
        // return toast;
    }
    doOnReady() {
        if (this.onConnectSub) {
            this.onConnectSub.unsubscribe();
            this.onConnectSub = undefined;
        }
        if (this.onDisconnectSub) {
            this.onDisconnectSub.unsubscribe();
            this.onDisconnectSub = undefined;
        }
        this.onConnectSub = this.network.onDisconnect().subscribe(() => {
            setTimeout(() => {
                let notConnect = this.network.type === "none";
                let connectionErrorLocal = localStorage.getItem("connection-error");
                let connectionError = parseInt(connectionErrorLocal);
                if (this.isFourground && notConnect && connectionError) {
                    // const alert = this.alertCtrl.create(this.connectionError);
                    // alert.present();
                }
                localStorage.setItem("connection-error", "0");
            }, 1000);
        });
        this.onDisconnectSub = this.network.onConnect().subscribe(() => {
            localStorage.setItem("connection-error", "1");
        });
    }

    ionViewWillLeave() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
