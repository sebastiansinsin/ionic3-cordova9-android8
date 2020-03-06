import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from '../services/interceptor.service';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';
import { IonicStorageModule } from '@ionic/storage';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        IonicStorageModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        SpinnerComponent,
        IonicStorageModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        },
        SharedService,
        AuthService
    ]
})
export class CoreModule { }
