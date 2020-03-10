import { EventEmitter, Injectable } from "@angular/core";
import { Socket } from "ng-socket-io";
import { Observable } from "rxjs/Rx";
import * as socketIo from 'socket.io-client';
import { ENV } from '../environments/environment';
@Injectable()
export class SocketService {
    url: string = ENV.gateway_url;
    paywallUrl = ENV.paywall_api_url;
    emitterNotifcation$: any = new EventEmitter();
    subscribersCounter: number = 0;
    isSetRoom: boolean = false;
    public socket_io;


    constructor(
        public socket: Socket,

    ) {
        this.socket_io = socketIo(this.url);
    }

    getStatus() {
        return Observable.create((observer: any) => {

            this.socket_io.on('status', (data) => {
                console.log("socket data status", data);
                observer.next(true);
            });

        }).share();
    }
}
