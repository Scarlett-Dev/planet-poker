import { Component, OnInit } from '@angular/core';
import {io, Socket} from 'socket.io-client';

@Component({
    selector: 'app-observer',
    templateUrl: './observer.component.html',
    styleUrls: ['./observer.component.css']
})

export class ObserverComponent implements OnInit {
private socket:any;
private messages = new Array();
private messageText = "";

    // messageText: string;
    // messages: Array<any>;
    // socket: ObserverComponent.Socket; 

    constructor() {
        this.socket = io('http://localhost:3000');
        // this.socket = io.connect();
       }

       ngOnInit() {
        this.messages = new Array();

        this.socket.on('message-received', (msg: any) => {
            this.messages.push(msg);
            console.log(msg);
            console.log(this.messages);
        });
      this.socket.emit('event1', {
          msg: 'Client to server, can you hear me server?'
      });
      this.socket.on('event2', (data: any) => {
        console.log(data.msg);
        this.socket.emit('event3', {
            msg: 'Yes, its working for me!!'
        });
      });
      this.socket.on('event4', (data: any) => {
          console.log(data.msg);
      });
   }   

   sendMessage() {
    const message = {
      text: this.messageText
    };
    this.socket.emit('send-message', message);
    console.log(message.text);
    this.messageText = '';
  }
}