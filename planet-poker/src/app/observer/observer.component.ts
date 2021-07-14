import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
private messagePoints = "";

values: any;

    // messageText: string;
    // messages: Array<any>;
    // socket: ObserverComponent.Socket; 

    constructor() {
        this.socket = io('http://localhost:3000');
        // this.socket = io.connect();
       this.values = this.listen('mp').subscribe((messageMap) => {
            console.log('Received the following data with the "listen" conmmand: ', messageMap);
        })
       }

       sendPotatoStuff(){
        //todo : update json collection on btn click
    }

       ngOnInit() {
           
        //todo: user connected -> emit event with username that a user has joined.

        this.messages = new Array();
        this.messageText = "My username";
        this.messagePoints = "3";

        //Broadcast the potato event; should contain the selected value of the user and its name
        console.log('Emitting the event "potato" with the following values:,', this.messages);
        this.socket.emit('potato', {user: this.messageText, points: this.messagePoints });

        //Listen for new inputs from other users that need to be displayed
        this.listen('mp').subscribe((data) => {
            //updatePlayerScoreOverview()
            console.log('Data received from the server', data);
        })

   }   


   listen(eventName: string){
       return new Observable((subscriber) => {
           this.socket.on(eventName, (data:any) =>{
               subscriber.next(data);
           })
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