import { Component, ViewChild } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version";
import { Clipboard } from '@ionic-native/clipboard';
import { FirebaseAnalyticsOriginal } from "@ionic-native/firebase-analytics";
import { Network } from "@ionic-native/network";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import CryptoJS from "crypto-js";
import { AlertController, App, Events, LoadingController, ModalController, Nav, Platform, PopoverController, ToastController } from "ionic-angular";
import * as moment from "moment";
import { NgProgressService } from 'ng2-progressbar';
import { Observable, Subject } from "rxjs/Rx";
import { ClientComponent } from "../pages/client/client.component";
import { ExpenseComponent } from "../pages/expense/expense.component";
import { FinanceTransactionComponent } from "../pages/finance/finance-transaction.component";
import { FinanceComponent } from "../pages/finance/finance.component";
import { HomePage } from "../pages/home/home.component";
import { InvoiceComponent } from "../pages/invoice/invoice.component";
import { PurchaseInvoiceComponent } from "../pages/invoice/purchase-invoice.component";
import { MaintenanceComponent } from "../pages/maintenance/maintenance.component";
import { PurchaseOrderComponent } from "../pages/order/purchase-order.component";
import { SalesOrderComponent } from "../pages/order/sales-order.component";
import { PaymentSendComponent } from "../pages/payment/payment-send.component";
import { PaymentComponent } from "../pages/payment/payment.component";
import { CategoryComponent } from "../pages/product/category.component";
import { ProductComponent } from "../pages/product/product.component";
// import { SettingComponent } from "../pages/settings/settings.component";
import { PushUpdateComponent } from "../pages/push-update/push-update.component";
import { WelcomeComponent } from "../pages/welcome/welcome.component";
import { AuthenticationService } from "../providers/auth-service";
import { HttpHandlerService } from "../providers/http-handler-service";
import { NetworkProvider } from "../providers/network";
import { SharedService } from "../providers/shared.service";
import { SocketService } from "../services/socket.service";
import { isProduction, setEventAnalytics, setScreenAnalytics, setUserIdAnalytics } from "../util/util";
import { HomeService } from "./../pages/home/home.service";
import { LocationListComponent } from "./../pages/inventory/location.component";
import { InformationCompanyComponent } from "./../pages/on-boarding/company/information-company.component";
import { OnBoardingComponent } from "./../pages/on-boarding/on-boarding.component";
import { Step1Component } from "./../pages/on-boarding/step1/step1.component";
import { Step2Component } from "./../pages/on-boarding/step2/step2.component";
import { SettingProfileComponent } from "./../pages/settings/profile/setting-profile.component";
// import { FeedbackComponent } from "./feedback.component";
import { SupportCenterComponent } from "./../pages/support/support-center.component";

declare var UserExperior: any;

// declare var KochavaTracker: any;
@Component({
    selector: "app-component",
    templateUrl: "app.html"
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = WelcomeComponent;
    // pages: Array<{
    //   icon: string;
    //   title: string;
    //   component?: any;
    //   nav: boolean;
    //   childs?: any[];
    //   toggle?: boolean;
    // }>;

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
    failedReLogin: any = {
        title: "Perpanjang Token Gagal",
        subTitle: "Silahkan login kembali..",
        buttons: [
            {
                text: "Tutup",
                handler: () => {
                    this.doLogout();
                }
            }
        ],
        cssClass: "dangerAlert"
    };
    error404: any = {
        title: "Unauthorize",
        subTitle: "Silahkan login kembali..",
        buttons: [
            {
                text: "Tutup",
                handler: () => {
                    this.doLogout();
                }
            }
        ],
        cssClass: "dangerAlert"
    };
    isMarketing: boolean;
    isAdmin: boolean;
    isOwner: boolean;
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
    pages: any = [
        {
            icon: "assets/img/side-menu/dashboard.svg", title: "Dashboard", component: HomePage, nav: true,
            active: true, new: false
        },
        {
            icon: "assets/img/side-menu/client.svg", title: "Mitra", component: ClientComponent, nav: true,
            active: false, new: false
        },
        {
            icon: "assets/img/side-menu/invoice.svg",
            title: "Invoice",
            nav: false,
            toggle: false,
            new: false,
            childs: [
                {
                    title: "Invoice Penjualan",
                    component: InvoiceComponent,
                    active: false,
                    beta: false
                },
                {
                    title: "Invoice Pembelian",
                    component: PurchaseInvoiceComponent,
                    active: false,
                    beta: false
                }
            ]
        },
        {
            icon: "assets/img/side-menu/order.svg",
            title: "Order",
            nav: false,
            toggle: false,
            new: false,
            childs: [
                {
                    title: "Sales Order",
                    component: SalesOrderComponent,
                    active: false,
                    beta: false
                },
                {
                    title: "Purchase Order",
                    component: PurchaseOrderComponent,
                    active: false,
                    beta: false
                }
            ]
        },
        {
            icon: "assets/img/side-menu/payment.svg",
            title: "Pembayaran",
            nav: false,
            toggle: false,
            new: true,
            childs: [
                {
                    title: "Pembayaran Digital",
                    component: 'DigitalPaymentPage',
                    active: false,
                    beta: true
                },
                {
                    title: "Terima Pembayaran",
                    component: PaymentComponent,
                    active: false,
                    beta: false
                },
                {
                    title: "Kirim Pembayaran",
                    component: PaymentSendComponent,
                    active: false,
                    beta: false
                }
            ]
        },
        {
            icon: "assets/img/side-menu/finance.svg",
            title: "Keuangan",
            nav: false,
            toggle: false,
            new: false,
            childs: [
                {
                    title: "Dashboard Keuangan",
                    component: FinanceComponent,
                    active: false,
                    beta: false
                },
                {
                    title: "Transaksi Keuangan",
                    component: FinanceTransactionComponent,
                    active: false,
                    beta: false
                }
            ]
        },
        {
            icon: "assets/img/side-menu/expense.svg",
            title: "Biaya",
            component: ExpenseComponent,
            nav: true,
            active: false,
            new: false
        },
        {
            icon: "assets/img/side-menu/product.svg",
            title: "Produk",
            nav: false,
            toggle: false,
            new: false,
            childs: [
                {
                    title: "Produk",
                    component: ProductComponent,
                    active: false,
                    beta: false
                },
                {
                    title: "Kategori  ",
                    component: CategoryComponent,
                    active: false,
                    beta: false
                }
            ]
        },
        {
            icon: "assets/img/side-menu/inventory.svg",
            title: "Stok",
            nav: false,
            toggle: false,
            new: false,
            childs: [
                {
                    title: "Lokasi List",
                    component: LocationListComponent,
                    active: false,
                    beta: false
                }
            ]
        },
        {
            icon: "assets/img/side-menu/report.svg",
            title: "Laporan",
            component: 'ReportMenuPage',
            nav: true,
            active: false,
            new: false
        }
        // ,
        // {
        //   icon: "assets/img/side-menu/setting.svg",
        //   title: "Pengaturan",
        //   component: SettingComponent,
        //   nav: true
        // }
    ];
    registerBackButton: Function;
    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public network: Network,
        public events: Events,
        public networkProvider: NetworkProvider,
        public authService: AuthenticationService,
        public alertCtrl: AlertController,
        public httpHandlerService: HttpHandlerService,
        public sharedService: SharedService,
        public modalCtrl: ModalController,
        public firebase: FirebaseAnalyticsOriginal,
        public appVersion: AppVersion,
        public loadingController: LoadingController,
        private pService: NgProgressService,
        private toastCtrl: ToastController,
        public socketService: SocketService,
        public app: App,
        private clipboard: Clipboard,
        public popoverCtrl: PopoverController,
        public homeService: HomeService
    ) {
        events.subscribe('login', () => {
            this.cekProfile();
        });

        let package_start = new Date(localStorage.getItem("package_start"));
        let package_end = new Date(localStorage.getItem("package_end"));

        console.log("package", package_start, package_end)

        // var myEpochStart = package_start.getTime()/1000.0;
        // var myEpochEnd = package_end.getTime()/1000.0;

        // localStorage.setItem("myEpochStart", myEpochStart.toString());
        // localStorage.setItem("myEpochEnd", myEpochEnd.toString());

        this.cekProfile();

        localStorage.setItem("campaign", "referrer=");
        console.log("this.version", localStorage.getItem("version"));


        this.socket_get_status$ = this.socketService.getStatus().subscribe((data: any) => {
            console.log("socket Data:", data);
            this.rootPage = MaintenanceComponent;
        },
            (err: any) => {
                console.log("error socket", err);
            });



        console.log("this.socket_get_status", this.socket_get_status$);
        // this.splashScreen.show();
        this.initializeApp();

        console.log("this.authService.isLogged()", this.authService.isLogged())

        if (this.authService.isLogged()) {
            let company = JSON.parse(localStorage.getItem("company")) || {};
            console.log("this.company", company);
            if (this.platform.is('cordova')) {
                if (this.profile.email) {
                    UserExperior.setUserIdentifier(this.profile.email);
                }
            }
            // JK: Ganti get status dari onboarding ke local storage onboarding
            let status_onboarding = JSON.parse(localStorage.getItem("onboarding_data")) || {};

            console.log("status_onboarding", status_onboarding);

            // if(!this.profile.name){
            // 	this.rootPage = OnBoardingComponent;//OnBoarding
            // }else if(status_onboarding.active_onboarding == '1'){
            // 	this.rootPage = Step1Component;//HomePage;
            // }else if(status_onboarding.active_onboarding == '2'){
            // 	this.rootPage = Step2Component;//HomePage;
            // }else if(status_onboarding.active_onboarding == '3'){
            // 	this.rootPage = InformationCompanyComponent;//HomePage;
            // }else{
            // 	this.rootPage = HomePage;//HomePage;
            // }

            this.authService.getStatusOnboarding(company.uuid).subscribe(
                data => {
                    console.log("data onBoarding", data);
                    // if(data.active_onboarding == 'done'){
                    // 	this.rootPage = HomePage;//HomePage;
                    // }else
                    if (!this.profile.name || !this.profile.phone) {
                        this.rootPage = OnBoardingComponent;//OnBoarding
                    } else if (data.active_onboarding == '1') {
                        this.rootPage = Step1Component;//HomePage;
                    } else if (data.active_onboarding == '2') {
                        this.rootPage = Step2Component;//HomePage;
                    } else if (data.active_onboarding == '3') {
                        this.rootPage = InformationCompanyComponent;//HomePage;
                    } else {
                        this.rootPage = HomePage;//HomePage;
                    }
                }
            );

        }
        this.checkModuleRole();
        this.sharedService.homeEmitter.subscribe((isHome: any) => {
            if (isHome) {
                this.checkModuleRole();
            }
        });
        this.authService
            .getLoggedInUser()
            .take(1)
            .subscribe((res: any) => {
                console.log("user", res);
                this.users = res.user;
            });
    }

    clearToggle(item: any) {
        this.pages.forEach((v: any) => {
            if (v.title != item.title && v.toggle) {
                v.toggle = false;
            }

            if (v.title == item.title) v.active = true;
            if (v.title != item.title) v.active = false;
        });
    }
    setActive(item: any) {
        console.log("this.page 0", item);
        this.pages.forEach((v: any) => {

            if (v.childs) {
                console.log('this.page 00', v.childs, item.title)
                v.childs.forEach((data: any) => {
                    if (data.title == item.title) {
                        data.active = true;
                        console.log("this.pages 1", data);
                    }
                    if (data.title != item.title) {
                        data.active = false;
                    }
                });
            }

        });
        console.log("this.pages", this.pages);
    }

    cekProfile() {
        let profile = this.authService.getuserFull();
        console.log("profilenya", profile);
        this.profile.name = profile.user.name;
        this.profile.email = profile.user.email;
        this.profile.phone = profile.user.phone;

        if (profile.package.code == 'P01' || profile.package.code == 'P02' || profile.package.code == 'P03') {
            this.profile.package = 'Rocket';
        } else if (profile.package.code == 'B01' || profile.package.code == 'B02' || profile.package.code == 'B03') {
            this.profile.package = 'Jet';
        } else {
            this.profile.package = 'Free';
        }

        if (profile.user_module_role[0]) {
            this.profile.role = profile.user_module_role[0].module_role.name;
        }
        this.referral_code = localStorage.getItem("referral_code");
        console.log("referral_code 0", this.referral_code);

        let user_uuid = this.authService.getuserFull().user.uuid;

        this.homeService.getUserProfile(user_uuid).subscribe(
            res => {
                this.profile.name = res.name;
                this.profile.email = res.email;
                this.profile.phone = res.phone;
            }
        )
    }
    copy() {
        console.log("referral_code", this.referral_code);
        let copy = this.clipboard.copy(this.referral_code);
        console.log(copy);
        if (copy) {
            let toast = this.toastCtrl.create({
                message: this.referral_code + ' Copy to Clipboard',
                position: 'bottom',
                duration: 3000
            });
            toast.present();
        }
    }
    ionViewDidEnter() {
        this.platform.registerBackButtonAction(() => {
            const overlayView = this.app._appRoot._overlayPortal._views[0];
            let updated = localStorage.getItem("updated");
            if (overlayView && overlayView.dismiss && updated != '1') {
                overlayView.dismiss();
            }
        }, 1);

        setScreenAnalytics("create_purchase_invoice_open", this.firebase);
        setEventAnalytics("create_purchase_invoice_open", this.firebase);
    }

    pushUpdate() {

        let popover = this.popoverCtrl.create(PushUpdateComponent, {
            viewInvoice: ''
        }, { cssClass: 'update-popover', enableBackdropDismiss: false });
        popover.onDidDismiss((type: string) => {

        });
        popover.present();
    }

    applicationStatus() {
        this.authService.loadApplicationStatus().subscribe(status => {
            console.log("maintenance status:", status);
            if (!status.status) {
                this.rootPage = MaintenanceComponent;
            }
            if (status && status.version_mobile_app) {
                // this.pushUpdate();
                if (this.platform.is('cordova')) {
                    this.appVersion.getVersionNumber().then(version => {
                        let versionNumber = Number(version.split(".").join(""));
                        let versionServer = Number(status.version_mobile_app.split(".").join(""));
                        if (versionServer > versionNumber) {
                            this.pushUpdate();
                            localStorage.setItem("updated", "1");
                        } else {
                            localStorage.setItem("updated", "0");
                        }
                    });
                }

            }
        }, (err: any) => {
            console.log("error 1", err);
            if (err == "Server error") {
                var error_description = "Please try again later or contact support@paper.id";
                const alert = this.alertCtrl.create({
                    subTitle: error_description,
                    buttons: ["OK"],
                    cssClass: "dangerAlert"
                });
                alert.present();
            }
        });
    }

    initializeApp() {
        console.log("InitailizeApp");
        this.cekNetwork();
        this.cekProfile();

        this.httpHandlerService.emitter401.subscribe((data: any) => {
            console.log("data emitter401", data);
            if (data) {
                this.doLogout();
                // const alert = this.alertCtrl.create(this.failedReLogin);
                // alert.present();
            }
        },
            (err: any) => {
                console.log("error", err);
            });

        this.loader = this.loadingController.create({
            content: "<span style='color:#ffffff;'>Connecting...</span>",
            showBackdrop: true
        });



        this.platform.resume.subscribe((res: any) => {
            this.isFourground = true;
            this.applicationStatus();
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
            let hasCity = this.sharedService.getCityUser();
            if (!hasCity) {
                this.sharedService.setCityUser("notFound!");
            }
            this.sharedService
                .getCurrentIp()
                .take(1)
                .subscribe(
                    (res: any) => {
                        this.sharedService
                            .getCurrentCityByIp(res.ip)
                            .take(1)
                            .subscribe(
                                (res: any) => {
                                    if (res && res.cityName) {
                                        this.sharedService.setCityUser(res.cityName);
                                    }
                                },
                                (err: any) => {
                                    let hasCity = this.sharedService.getCityUser();
                                    if (!hasCity) {
                                        this.sharedService.setCityUser("notFound!");
                                    }
                                }
                            );
                    },
                    (err: any) => {
                        let hasCity = this.sharedService.getCityUser();
                        if (!hasCity) {
                            this.sharedService.setCityUser("notFound!");
                        }
                    }
                );
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
            this.applicationStatus();
            this.statusBar.backgroundColorByHexString('#3D99D4');//styleBlackOpaque();
            let hasCity = this.sharedService.getCityUser();
            if (!hasCity) {
                this.sharedService.setCityUser("notFound!");
            }


            if (this.platform.is('cordova')) {
                console.log("this platform", this.platform);

                if (isProduction) {
                    UserExperior.startRecording("baafd108-9661-4768-bdbc-42b8deb47645");
                } else {
                    UserExperior.startRecording("5d8315ca-748b-4896-840b-5ebf1b5a6969");
                }
            }

            this.sharedService
                .getCurrentIp()
                .take(1)
                .subscribe(
                    (res: any) => {
                        this.sharedService
                            .getCurrentCityByIp(res.ip)
                            .take(1)
                            .subscribe(
                                (res: any) => {
                                    if (res && res.cityName) {
                                        this.sharedService.setCityUser(res.cityName);
                                    }
                                },
                                (err: any) => {
                                    let hasCity = this.sharedService.getCityUser();
                                    if (!hasCity) {
                                        this.sharedService.setCityUser("notFound!");
                                    }
                                }
                            );
                    },
                    (err: any) => {
                        let hasCity = this.sharedService.getCityUser();
                        if (!hasCity) {
                            this.sharedService.setCityUser("notFound!");
                        }
                    }
                );

        }).catch((err) => {

            console.log('ERROR: ', err);
            this.error404.title = "Something wrong";
            this.error404.subTitle = err;

            const alert = this.alertCtrl.create(this.error404);
            alert.present();
            this.splashScreen.hide();
            this.statusBar.overlaysWebView(false);
            this.applicationStatus();
            this.statusBar.backgroundColorByHexString('#3D99D4');//styleBlackOpaque();
            this.doOnReady();
            this.doLogout()

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

    // isLatesVersion() {

    // 	return new Observable((observer: any) => {
    // 		console.log("isLatesnya");
    // 		this.authService.getLatestVersion().subscribe(
    // 			(res: any) => {
    // 				console.log("this.res lates", res);
    // 				console.log(res.text());
    // 				let regex =
    // 					res
    // 						.text()
    // 						.match(
    // 							'Current Version</div><span class="htlgb"><div><span class="htlgb">[0-9].[0-9].[0-9][0-9][0-9]'
    // 						) + "";
    // 				let latestVersion = regex.substring(66);
    // 				regex = undefined;
    // 				this.appVersion.getVersionNumber().then(version => {
    // 					let latestVersionNumber = Number(latestVersion.split(".").join(""));
    // 					let versionNumber = Number(version.split(".").join(""));
    // 					console.log("version getversion", version);
    // 					console.log("latestVersion", latestVersion);
    // 					console.log("latestVersionNumber", latestVersionNumber);
    // 					console.log("versionNumber", versionNumber);
    // 					if (latestVersionNumber <= versionNumber) {
    // 						observer.next(true);
    // 					} else {
    // 						observer.next(false);
    // 					}
    // 					observer.complete();
    // 				});
    // 			},
    // 			() => {
    // 				observer.next(true);
    // 			}
    // 		);
    // 	});
    // }

    doOnReady() {
        let user_name = localStorage.getItem("user_name");
        let token_expire = localStorage.getItem("token_expire");
        this.checkModuleRole();
        if (user_name && token_expire) {
            console.log("user and token", user_name, token_expire)
            this.checkLogged(user_name, token_expire);
        }
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
    checkModuleRole() {
        let moduleRole: any = localStorage.getItem("user_module_role");
        if (moduleRole) {
            moduleRole = JSON.parse(moduleRole);
            console.log('moduleRole', moduleRole);
            if (moduleRole && moduleRole.length) {
                this.isAdmin = moduleRole[0].module_role.name == "Admin";
                this.isMarketing = moduleRole[0].module_role.name == "Marketing";
                this.isOwner = moduleRole[0].module_role.name == "Owner";
            }
        }
    }
    menuOpened() {
        // setScreenAnalytics("menu_open", this.firebase);
    }
    menuClosed() {
        // setScreenAnalytics("menu_close", this.firebase);
    }

    checkLogged(user_name, token_expire) {
        console.log("user nya", user_name, token_expire);
        let token_expire_date = moment(token_expire, "YYYY-MM-DD");
        let now = moment();
        let diff = token_expire_date.diff(now) < 86400 * 14; //14 hari
        let expire = token_expire_date.diff(now) < 0;
        if (expire) {
            return this.doLogout();
        }

        this.error404.subTitle = diff;

        const alert = this.alertCtrl.create(this.error404);
        alert.present();

        console.log("diff", diff);
        if (diff) {
            let userData = localStorage.getItem(user_name);
            if (userData) {
                let userDecrypt = CryptoJS.AES.decrypt(userData, user_name).toString(
                    CryptoJS.enc.Utf8
                );
                let user = JSON.parse(userDecrypt);
                console.log("user nya", user);
                this.authService.postLogin(user).subscribe(
                    data => {
                        this.saveOAuthToken(data.access_token, user)
                            .take(1)
                            .subscribe(
                                (res: any) => { },
                                (err: any) => {
                                    this.doLogout();
                                    const alert = this.alertCtrl.create(this.failedReLogin);
                                    alert.present();
                                }
                            );
                    },
                    (err: any) => {
                        this.doLogout();
                        const alert = this.alertCtrl.create(this.failedReLogin);
                        alert.present();
                    }
                );

            }

        } else {
            setUserIdAnalytics(this.firebase);
        }
    }

    logout() {
        let confirm = this.alertCtrl.create({
            title: "Logout Aplikasi",
            message: "Apakah Anda Yakin?",
            buttons: [
                {
                    text: "Batal",
                    handler: () => { }
                },
                {
                    text: "Logout",
                    handler: () => {
                        this.doLogout();
                    }
                }
            ]
        });
        confirm.present();
        setScreenAnalytics("logout", this.firebase);
        setEventAnalytics("logout", this.firebase);
    }

    forceLogout() {
        let confirm = this.alertCtrl.create({
            title: "Selamat Email Anda Berhasil Di Ganti",
            message: "Silahkan melakukan Login ulang",
            buttons: [
                {
                    text: "Login",
                    handler: () => {
                        this.doLogout();
                    }
                }
            ]
        });
        confirm.present();
        setScreenAnalytics("logout", this.firebase);
        setEventAnalytics("logout", this.firebase);
    }

    doLogout() {
        let user_name = localStorage.getItem("user_name") || "";
        localStorage.removeItem(user_name);
        localStorage.removeItem("user_name");
        localStorage.removeItem("token_expire");
        localStorage.removeItem("user_id");
        localStorage.removeItem("referral_code");
        this.authService.postLogout().takeUntil(this.ngUnsubscribe).subscribe(
            (res: any) => {
                this.nav.setRoot(WelcomeComponent);
            },
            (err: any) => {
                this.nav.setRoot(WelcomeComponent);

            }
        );
    }

    openPage(page) {
        console.log("page component", page, page.component.name);
        // if (page.url) {
        // 	this.rootPage = page.url;
        // }
        // else {
        this.nav.setRoot(page.component);
        // }
        if (this.platform.is('cordova')) {
            UserExperior.startScreen(`${page.title}`);
        }
    }

    openChild(page) {
        page.toggle = !page.toggle;
    }

    saveOAuthToken(oauth_token, userData) {
        return new Observable((observer: any) => {
            if (oauth_token) {
                localStorage.setItem("bearer_token", oauth_token);
            }
            let next5Day = moment()
                .add(5, "days")
                .format("YYYY-MM-DD");
            this.authService.getLoggedInUser().subscribe(
                data => {
                    localStorage.setItem("user_name", data.user.name);
                    localStorage.setItem("token_expire", next5Day);
                    localStorage.setItem("user_id", data.user.uuid);
                    setEventAnalytics("extend_token", this.firebase, data.user.uuid);
                    setUserIdAnalytics(this.firebase);
                    observer.next();
                    observer.complete();
                },
                (err: any) => {
                    observer.error(err);
                    observer.complete();
                }
            );
        });
    }

    feedBackOpen() {
        // let modalOptions = this.sharedService.modalOptions;
        // let filterModal = this.modalCtrl.create(
        // 	FeedbackComponent,
        // 	{},
        // 	modalOptions
        // );
        // filterModal.onDidDismiss(() => {
        // 	// setScreenAnalytics("feedback_close", this.firebase);
        // });
        // filterModal.present();
        // setScreenAnalytics("feedback_open", this.firebase);
        this.nav.push(SupportCenterComponent);
    }

    goToProfile() {
        this.nav.push(SettingProfileComponent);
    }

    ionViewWillLeave() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
