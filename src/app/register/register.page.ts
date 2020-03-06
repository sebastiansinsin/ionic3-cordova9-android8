import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from './register.service';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { User } from '../interface/user';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { map, mergeMap } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { OnboardingService } from '../onboarding/onboarding.service';
declare var _cio: any;
declare var UserExperior: any;
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerForm: FormGroup = this.fb.group({
        email: [
            "", Validators.required
        ],
        password: ["", Validators.required],
        password_confirmation: ["", Validators.required],
        registered_by: ["", Validators.required]
    });
    submitAttempt: boolean = false;
    type_input: string = '';
    mask_value: boolean = true;
    password_type: string = 'password';
    password_valid: boolean = false;
    password_value: string = null;
    isLoading: boolean = false;
    constructor(
        private fb: FormBuilder,
        private registerService: RegisterService,
        private loginService: LoginService,
        private authService: AuthService,
        private storage: Storage,
        private platform: Platform,
        private onboardingService: OnboardingService
    ) { }

    ngOnInit() {
    }

    mask() {
        this.mask_value = true;
        this.password_type = "password";
        console.log(this.mask_value, "mask");
    }

    unmask() {
        this.mask_value = false;
        this.password_type = "text";
        console.log(this.mask_value, "unmask");
    }

    validatePassword() {
        if (this.registerForm.controls.password_confirmation.value != "") {
            if (this.registerForm.controls.password.value === this.registerForm.controls.password_confirmation.value) {
                this.password_valid = true;
                this.password_value = "Password matches";
            } else {
                this.password_valid = false;
                this.password_value = "Password does not match";
            }
        }
    }

    save(registerForm) {
        this.submitAttempt = true;
        if (registerForm.valid && this.submitAttempt && this.password_valid == true) {
            this.isLoading = true;
            let data = registerForm.value;

            console.log("save", registerForm.value, data);
            this.registerService.registerUser(registerForm.value).subscribe(
                response => {
                    console.log("regist Res", response);
                    // this.navCtrl.setRoot(Login);
                    let dataRegister = {
                        user: {}
                    };
                    Object.assign(dataRegister.user, response.user);
                    let created_at = new Date(response.user.created_at);
                    console.log('dataRegister', dataRegister, created_at.getTime() / 1000.0);

                    _cio.identify({
                        id: response.user.email,
                        email: response.user.email,
                        created_at: created_at.getTime() / 1000.0,
                        package_name: 'basic',
                        register: 'ionic',
                        is_ionic: 'yes',
                        is_user: true
                    });
                    _cio.track("Register", {
                        id: response.user.email,
                        email: response.user.email,
                        create_at: created_at.getTime() / 1000.0,
                        package_name: 'basic',
                        is_ionic: 'yes',
                        is_user: true
                    });
                    localStorage.setItem('register', JSON.stringify(dataRegister));
                    // this.sharedService.successRegister();
                    const userData = {
                        email: registerForm.controls.email.value,
                        password: registerForm.controls.password.value
                    };
                    this.loginAfterRegister(userData);
                },
                err => {
                    this.isLoading = false;
                    console.log("err.status", err.status);
                    if (err.status == 503) {
                        // return this.navCtrl.setRoot(MaintenanceComponent);
                    }
                    // this.sharedService.faildRegister(err.message);
                }
            );
        } else {
            // this.sharedService.failedForm("", "Daftar");
        }
    }

    loginAfterRegister(userData): Observable<any> {
        return this.loginService.postLogin(userData).pipe(
            map(
                (data: User) => {
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
                }
            ),
            mergeMap(data => {
                return this.onboardingService.getStatusOnboarding(data.company.uuid);
            })
        );
    }
}
