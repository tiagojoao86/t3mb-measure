import { Component, OnInit } from '@angular/core';
import { MessageSended } from '../message-service/message-sended';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showMessage(message: MessageSended) {
    console.log(message);
  }

}
