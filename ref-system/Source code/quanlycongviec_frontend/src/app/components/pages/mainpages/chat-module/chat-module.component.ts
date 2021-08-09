import { Component, OnInit } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chat-module',
  templateUrl: './chat-module.component.html',
  styleUrls: ['./chat-module.component.css']
})
export class ChatModuleComponent implements OnInit {
  newMessage: string;
  messageList = [];
  // ws = new WebSocket('http://192.168.10.122:8000');
  // @ts-ignore
  socket: any;
  constructor() {
    this.socket = io('http://192.168.10.122:8888', { secure: true } );
  }

  ngOnInit(): void {
    this.onNewMessage().subscribe(msg => {
      console.log('got a msg: ' + msg);
    });
  }
  submit(){
    const message = {
      text: this.newMessage
    };
    this.socket.emit('send-message', message);
    this.newMessage = '';

  }

  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('message', msg => {
        console.log(msg);
        observer.next(msg);
      });
    });
  }

}
