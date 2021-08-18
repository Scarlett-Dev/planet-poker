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
  // scoresByUserArray = [{"name": 'Pingu', "score": '3'},{"name": 'Snorlax', "score": '1'}]
  scoresByUserArray:string[] = [];

  columnsToDisplay: string[] =['name', 'score']; 



  tshirtArray = ['S', 'M', 'L', 'XL', 'XXL'];
  arraystandard = ['1',  '2', '3', '5', '8', '13', '20', '40', '100'];

  constructor(public userService: UserService) {
    this.socket = io('http://localhost:3000');

 }

 ngOnInit() {

  this.userService.onCreatedUser().subscribe((message: string) => {

    this.scoresByUserArray.push(message);
    console.log('updating array with code from internet.', this.scoresByUserArray)
  })
}

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
}
