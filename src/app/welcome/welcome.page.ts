import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit, AfterViewInit {

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }
}
