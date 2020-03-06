import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirebaseX } from '@ionic-native/firebase-x';

@Component({
    selector: 'app-invoicer',
    templateUrl: './invoicer.page.html',
    styleUrls: ['./invoicer.page.scss'],
})
export class InvoicerPage implements OnInit {
    public pages = [
        {
            title: 'Home',
            url: '/invoicer/home',
            icon: 'home'
        },
        {
            title: 'List',
            url: '/invoicer/list',
            icon: 'list'
        }
    ];
    isAdmin;
    isMarketing;
    referral_code;
    isVerified;
    constructor(
        public alertController: AlertController,
        // private firebaseX = FirebaseX
    ) { }

    ngOnInit() {

    }

    setActive(item: any) {
        this.pages.forEach((v: any) => {
            if (v.childs) {
                v.childs.forEach((data: any) => {
                    if (data.title == item.title) {
                        data.active = true;
                    }
                    if (data.title != item.title) {
                        data.active = false;
                    }
                });
            }

        });
    }

    doLogout() {

    }

    async logout() {
        let confirm = await this.alertController.create({
            header: "Logout Aplikasi",
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
        await confirm.present();
        // this.firebaseX.setAnalyticsCollectionEnabled(true);
        // this.firebaseX.logEvent("logout", this.firebaseX);
        // this.firebaseX.setScreenName("logout");
        // setScreenAnalytics("logout", this.firebase);
        // setEventAnalytics("logout", this.firebase);
    }

    clearToggle(event) {

    }
    copy() {

    }
    openPage(page) {

    }
}
