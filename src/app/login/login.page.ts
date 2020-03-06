import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, takeUntil, flatMap, map, mergeMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FirebaseX } from '@ionic-native/firebase-x';
import { LoginService } from './login.service';
import { OnboardingService } from '../onboarding/onboarding.service';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../interface/user';

declare var UserExperior: any;
declare var _cio: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit, OnDestroy {
    mask_value: boolean = true;
    loginForm: FormGroup = this.fb.group(
        {
            email: ['', Validators.required],
            password: ['', Validators.required]
        }
    );
    isLoading: boolean = true;
    isLoadingEmail: boolean = false;
    type_input: string;
    submitAttempt: boolean = false;
    private ngUnsubscribe = new Subject();
    password_type = "password";
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private loginService: LoginService,
        // private firebase = FirebaseX,
        private onboardingService: OnboardingService,
        private storage: Storage,
        private platform: Platform,
        private router: Router
    ) { }

    ngOnInit() {
        console.log('login page on init');
    }

    ngAfterViewInit() {
        this.loginForm.controls['email'].valueChanges.pipe(debounceTime(500), takeUntil(this.ngUnsubscribe)).subscribe(
            value => {
                this.validateInput(value);
            }
        );
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    validateInput(value) {
        const input = String(value).toLowerCase();
        const testMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (testMail.test(input)) {
            this.isLoadingEmail = true;
            this.type_input = "Email";
            return true;
        } else {
            this.type_input = "";
            return false;
        }
    }

    login(loginForm: FormGroup) {
        this.submitAttempt = true;
        const userData = {
            email: loginForm.controls.email.value,
            password: loginForm.controls.password.value
        };
        if (loginForm.valid && this.submitAttempt) {
            this.isLoading = true;
            /**
             * call API post to login
             */
            this.loginService.postLogin(userData).pipe(
                map((data: User) => {
                    console.log(data);
                    if (data) {
                        this.authService.saveLocalStorageUserData(data);
                        if (data.user && data.user.user_mercy_corp && data.user.user_mercy_corp.referral_code) {
                            this.storage.set('referral_code', data.user.user_mercy_corp.referral_code);
                        }
                        if (this.platform.is('cordova')) {
                            UserExperior.setUserIdentifier(data.user.email);
                        }
                        return data;
                    }
                }),
                mergeMap(data => { return this.onboardingService.getStatusOnboarding(data.company.uuid); })
            ).subscribe(
                res => {
                    console.log(res);
                    if (res && res.code === 200) {
                        this.storage.set('onboarding_data', JSON.stringify(res));
                        this.storage.set('skippable', res.skippable);
                        this.router.navigateByUrl('/invoicer');
                        /**
                         * navigate based on onboarding status
                         */
                        // if (res.active_onboarding === 'done') {
                        //     this.router.navigateByUrl('/invoicer');
                        // }
                        // else if (res.active_onboarding === '1') {
                        //     this.router.navigateByUrl('/onboarding/step1')
                        // }
                        // else if (res.active_onboarding === '2') {
                        //     this.router.navigateByUrl('/onboarding/step2');
                        // }
                        // else if (res.active_onboarding === '3') {
                        //     this.router.navigateByUrl('/onboarding/step3');
                        // }
                        // else {
                        //     this.router.navigateByUrl('/onboarding');
                        // }
                    }
                },
                err => { this.isLoading = false },
                () => { this.isLoading = false }
            );
        }
        else {
            return false;
        }
    }

    unmask() {
        this.mask_value = false;
        this.password_type = "text";
    }

    mask() {
        this.mask_value = true;
        this.password_type = "password";
    }

    setCustomerIO() {

    }
}
