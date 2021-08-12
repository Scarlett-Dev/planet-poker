import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../model/user";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent  {

  gameMode = '';
  userArray:string[] = [];

  //TODO: populate array with values received from the server.
  scoresByUserArray = [{"name": 'Pingu', "score": '3'},{"name": 'Snorlax', "score": '1'}]
  columnsToDisplay: string[] =['name', 'score']; 


  tshirtArray = ['S', 'M', 'L', 'XL', 'XXL'];
  arraystandard = ['1',  '2', '3', '5', '8', '13', '20', '40', '100'];

  constructor(public userService: UserService) {

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




}
