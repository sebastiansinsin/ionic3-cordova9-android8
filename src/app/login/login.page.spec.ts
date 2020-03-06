import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';

describe('LoginPage', () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, IonicStorageModule.forRoot(), IonicModule],
            declarations: [LoginPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('#loginPage', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
        it('should have form login', () => {
            expect(component.loginForm).toBeTruthy();
        });
        it('should have email field', () => {
            expect(component.loginForm.controls.email).toBeTruthy();
        });
        it('should have password field', () => {
            expect(component.loginForm.controls.password).toBeTruthy();
        });
        it('email value is required and must be an email pattern', () => {
            /**
             * check if email is required
             */
            const email = component.loginForm.controls['email'];
            const error = email.errors || {};
            expect(error['required']).toBeTruthy();
            /**
             * check if email has follow pattern rule
             */
            email.setValue('test@paper.id');
            const error_pattern = component.validateInput(email.value);
            expect(error_pattern).toBeTruthy();
        });
        it('password value is required', () => {
            /**
             * check if password is required
             */
            const password = component.loginForm.controls['password'];
            const error = password.errors || {};
            expect(error['required']).toBeTruthy();
        });
        it('can login if form is valid', () => {
            /**
             * can't login if email and password field is not filled
             */
            expect(component.loginForm.valid).toBeFalsy();
            expect(component.login(component.loginForm)).toBeFalsy();
            component.loginForm.controls['email'].setValue('test@paper.id');
            component.loginForm.controls['password'].setValue('123456');
            expect(component.loginForm.valid).toBeTruthy();
            expect(component.login(component.loginForm)).toBeFalsy(false);
        });
    });
});
