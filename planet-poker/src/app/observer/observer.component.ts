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
        console.log('STARTED:', this.messages);
        console.dir('Pingu says:', this.messages);

        //Todo: Figure out how to emit an event (Broadcast?)
        this.socket.emit('potato', () => {
            this.messages.push('Start_Potato')
            console.log('Emit The Potato!');
        });

        console.log('Should emit potato, reading event now', this.messages);

        //TODO: Figure our how to react to an event (Listener?)
        this.socket.on('potato', () => {
            console.log('Potato has entered the virtual env!')
        });

        this.socket.on('message-received', (msg: any) => {
            this.messages.push(msg);
            console.log(msg);
            console.log(this.messages);
        });

      this.socket.emit('event1', {
          msg: 'Client to server, can you hear me server?'
      });

      this.socket.on('event1', (data: any) => {
        console.log('Event 1 emitted.')

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