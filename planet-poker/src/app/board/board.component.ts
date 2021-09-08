import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Observable, Subscription} from 'rxjs';
import {User} from "../model/user";
import {io} from "socket.io-client";
import {MatTableDataSource} from "@angular/material/table";

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


  testUsers: User[] = this.userService.users;
  private userSubscription!: Subscription;
  scoresByUserTable = new MatTableDataSource<User>();

  columnsToDisplay =['name', 'score'];





  tshirtArray = ['S', 'M', 'L', 'XL', 'XXL'];
  arraystandard = ['1',  '2', '3', '5', '8', '13', '20', '40', '100'];

  constructor(public userService: UserService) {
    this.socket = io('http://localhost:3000');

 }

 ngOnInit() {

    // lifehack to trigger the table :) <3 you
    this.getUsername("dummy");

   this.userSubscription = this.userService
     .getUpdateListener()
     .subscribe((users: User[]) => {

       console.log("USERS" + users);
       //this.testUsers = users;
       this.scoresByUserTable.data = this.testUsers;

     });




   this.userService.onCreatedUser().subscribe((message: string) => {
     // this.scoresByUserTable.data = JSON.stringify(new User(message.);
     console.log("message " + message);

     // let jsonObject: User[] = JSON.parse(message);
     //
     // console.log("object" + jsonObject);
     //
     //
     // jsonObject.forEach(element => {
     //
     //   console.log("BoardComponent   The entire user", element);
     //   console.log("The entire user", element);
     //   console.log("The user name",element.name);
     //   console.log("The user score",element.selectedScore);
     // });

     this.scoresByUserArray.push(message);
     console.log('updating array with code from internet.', this.scoresByUserArray);
     console.log('checking the array from userservice.', this.userService.users);
     this.scoresByUserTable.data = this.userService.users;

   })

   console.log("LOGGING" + this.testUsers);




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
