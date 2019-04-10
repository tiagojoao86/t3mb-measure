import { Component, OnInit } from '@angular/core';
import { MessageSended } from './message-sended';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  infoMessage: string[] = [''];
  titleMessage: string = '';
  display: boolean = false;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.controlMessage.subscribe(
      (message: MessageSended) => {
        this.showMessage(message);
      })
    
  }

  showMessage(message: MessageSended) {
    this.infoMessage = message.message;
    this.titleMessage = message.type;
    this.display = true;
  }

}
