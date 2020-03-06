import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvoicerPage } from './invoicer.page';

const routes: Routes = [
    {
        path: '',
        component: InvoicerPage,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
            },
            {
                path: 'list',
                loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
            },
        ]
    },

];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [InvoicerPage]
})
export class InvoicerPageModule { }
