import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { LoginService } from './login.service';
import { CoreModule } from '../module/core.module';
import { OnboardingService } from '../onboarding/onboarding.service';

const routes: Routes = [
    {
        path: '',
        component: LoginPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        CoreModule
    ],
    declarations: [LoginPage],
    providers: [
        LoginService,
        OnboardingService
    ]
})
export class LoginPageModule { }
