import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import { Observable } from 'rxjs';
import {User} from "../model/user";
import {io} from "socket.io-client";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit  {
  private socket:any;
  gameMode = '';
  userArray:string[] = [];

  //TODO: populate array with values received from the server.
  scoresByUserArray = [{"name": 'Pingu', "score": '3'},{"name": 'Snorlax', "score": '1'}]
  dummyArray:any;
  columnsToDisplay: string[] =['name', 'score']; 


  tshirtArray = ['S', 'M', 'L', 'XL', 'XXL'];
  arraystandard = ['1',  '2', '3', '5', '8', '13', '20', '40', '100'];

  constructor(public userService: UserService) {
    this.socket = io('http://localhost:3000');

// TODO: Fix
  //   this.dummyArray  = this.listen('new_user_added').subscribe((data:any) => {
  //     console.log('constructor Received the following data with the "listen" conmmand: ', data);
  //   });
  
  //   this.listen('new_user_added').subscribe((data) => {
  //     //updatePlayerScoreOverview()
  //     console.log('constructor Data received from the server', data);
  // })
  
  //   this.socket.on('new_user_added', function(messageText:any){
  //     console.log("constructor Listening for zwik on socket "+messageText);
  //   });



 }

 ngOnInit() {
  this.dummyArray  = this.listen('new_user_added').subscribe((data:any) => {
    console.log('Received the following data with the "listen" conmmand: ', data);
  });

  this.listen('new_user_added').subscribe((data) => {
    //updatePlayerScoreOverview()
    console.log('Data received from the server', data);
})

  this.socket.on('new_user_added', function(messageText:any){
    console.log("Listening for zwik on socket "+messageText);
  });

}


  // tslint:disable-next-line:typedef
  usernameInput: any;

  onToggle(value: string){
    this.gameMode = value;
  }

  getGameMode(){
    if(this.gameMode === 'tshirt'){
      return this.tshirtArray;
    }else{
      return this.arraystandard;
    }
  }

  getUsername(username:any){   
    console.log("The fetched username "+username);

    let data = JSON.stringify(new User(username, 0));

    this.userArray.push(data);
    this.userService.createUser(data);
    console.log("Emit event that a new user is created "+data);
  }

  buttonClicked(card: string){
    console.log("Card " + card + " clicked!");  // Add this score to the object ?
  }


  listen(eventName: string){
    return new Observable((subscriber) => {
        this.socket.on(eventName, (data:any) =>{
            subscriber.next(data);
        })
    });
}



}
