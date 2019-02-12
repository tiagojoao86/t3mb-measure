import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { MessageSended } from './message-sended';

@Injectable()
export class MessageService {
    controlMessage = new Subject();

    showMessage(message: MessageSended) {
        this.controlMessage.next(message);
    }
}