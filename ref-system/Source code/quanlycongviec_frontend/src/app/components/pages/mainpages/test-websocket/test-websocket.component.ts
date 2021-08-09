import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import ReconnectingWebSocket from 'reconnecting-websocket';

@Component({
  selector: 'app-test-websocket',
  templateUrl: './test-websocket.component.html',
  styleUrls: ['./test-websocket.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TestWebsocketComponent implements OnInit, AfterViewInit {
  htmlContent = '';
  inbox: any;
  outbox: any;
  newMessage: any;
  handle: any;
  messageList: any;
  // ws = new WebSocket('ws://echo.websocket.org');
  ws = new WebSocket('ws://192.168.10.118:8088');

  constructor() {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.connect();
  }

  submit(event) {
    console.log(this.newMessage);
    event.preventDefault();
    this.outbox.send(JSON.stringify({handle: this.handle, text: this.newMessage }));
    this.newMessage = '';
  }
  connect() {
    this.inbox = new ReconnectingWebSocket('ws://118.69.156.139:8888/receive');
    this.outbox = new ReconnectingWebSocket('ws://118.69.156.139:8888/submit');
    this.inbox.onmessage = (message) => {
      console.log(message);
      const data = JSON.parse(message.data);
      this.htmlContent = this.htmlContent +
        `<div class='panel panel-default'>
         <div class='panel-heading'>` + data.handle +
        `</div><div class='panel-body'>` + data.text + `</div></div>`;
      // chatText.stop().animate({
      //   scrollTop: chatText[0].scrollHeight
      // }, 800);
    };
    this.inbox.onclose = () => {
      console.log('inbox closed');
      this.inbox = new WebSocket(this.inbox.url);
    };

    this.outbox.onclose = () => {
      console.log('outbox closed');
      this.outbox = new WebSocket(this.outbox.url);
    };
  }
}

