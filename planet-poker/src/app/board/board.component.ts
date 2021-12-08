import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { io } from 'socket.io-client';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  private socket: any;
  gameMode = '';
  userArray: string[] = [];


  scoresByUserArray: string[] = [];

  //TODO: Should be populated with get statement from DB. Also needs to be refreshed.
  // by defeault users should be visible but scores shouldn't. (Hide with a random emoji?)
  scoresByUserTable = new MatTableDataSource<User>();

  singleUserArray: User[] = [];

  columnsToDisplay: string[] = ['name', 'score'];

  tshirtArray = ['S', 'M', 'L', 'XL', 'XXL'];
  arraystandard = ['1', '2', '3', '5', '8', '13', '20', '40', '100'];

  constructor(public userService: UserService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {

    console.log(
      'Initial values of the receivedUserArray',
      this.userService.receivedUserArray
    );

    // @Deprecated -> remove this 
    this.userService.onCreatedUser().subscribe((message: any) => {
      this.scoresByUserArray.push(message);

      console.log(
        'Stolen data from service',
        this.userService.receivedUserArray
      );
      console.log(
        'updating array with code from internet.',
        this.scoresByUserArray
      );
    });

        // @Deprecated -> remove this 
    this.userService.onSingleCreatedUser().subscribe((message: any) => {
      console.log('Single user: ' + message);
      try {
        let user = User.fromJSON(message);
        this.singleUserArray.push(user);
        this.scoresByUserTable.data = this.singleUserArray;

        console.log('The parsed single user object:' + user.name);
        console.log(
          'User should be added to table collection: ' + this.scoresByUserTable
        );
      } catch (Exception) {
        console.log('ERROR: Something went wrong while parsing the json');
      }
    });
  }
  

  usernameInput: any;

  //TODO: Remove from board -> add to login page
  onToggle(value: string) {
    this.gameMode = value;
  }

  //TODO: Refactor -> Gamemode should be received from login page
  getGameMode() {
    if (this.gameMode === 'tshirt') {
      return this.tshirtArray;
    } else {
      return this.arraystandard;
    }
  }

  //TODO: @Deprecated
  getUsername(username: any) {
    console.log('The fetched username ' + username);

    let data = JSON.stringify(new User(username, 0));

    this.userArray.push(data);
    this.userService.createUser(data);
    console.log('Emit event that a new user is created ' + data);
  }

  //TODO: implement: UPDATE DB for specific user to update score (see https://stackoverflow.com/questions/10522347/how-do-you-update-objects-in-a-documents-array-nested-updating )
  buttonClicked(card: string) {
    console.log('Card ' + card + ' clicked!'); 
    // db.bar.update( {user_id : 123456 , "items.item_name" : "my_item_two" } , 
    //             {$inc : {"items.$.price" : 1} } , 
    //             false , 
    //             true);
  }

  //TODO: connect to a button on page
  resetScores(){
    //TODO: UPDATE to db for all users in session set score to empty
  }

  //TODO: connect to toggle btn.
  showScores(){
    //TODO: Show scores
  }


}
