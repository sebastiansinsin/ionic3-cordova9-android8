import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
    @HostBinding('style.position') get position() {
        return 'absolute';
    }
    @HostBinding('style.top') get top() {
        return '0';
    }
    @HostBinding('style.background-color') get backgroundColor() {
        return 'rgba(0,0,0,0.2)';
    }
    @HostBinding('style.width') get width() {
        return '100%';
    }
    @HostBinding('style.height') get height() {
        return '100%';
    }
    @HostBinding('style.z-index') get zindex() {
        return '5000';
    }
    constructor() { }

    ngOnInit() { }

}
