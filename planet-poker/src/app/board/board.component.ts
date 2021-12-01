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

  //TODO: populate array with values received from the server.
  // scoresByUserArray = [{"name": 'Pingu', "score": '3'},{"name": 'Snorlax', "score": '1'}]
  scoresByUserArray: string[] = [];

  //this shit should work
  scoresByUserTable = new MatTableDataSource<User>();

  singleUserArray: User[] = [];

  columnsToDisplay: string[] = ['name', 'score'];

  tshirtArray = ['S', 'M', 'L', 'XL', 'XXL'];
  arraystandard = ['1', '2', '3', '5', '8', '13', '20', '40', '100'];

  constructor(public userService: UserService) {
    this.socket = io('http://localhost:8080');
  }

  ngOnInit() {
    // this.getUsername("init!")
    console.log(
      'Initial values of the receivedUserArray',
      this.userService.receivedUserArray
    );

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

  onToggle(value: string) {
    this.gameMode = value;
  }

  getGameMode() {
    if (this.gameMode === 'tshirt') {
      return this.tshirtArray;
    } else {
      return this.arraystandard;
    }
  }

  getUsername(username: any) {
    console.log('The fetched username ' + username);

    let data = JSON.stringify(new User(username, 0));

    this.userArray.push(data);
    this.userService.createUser(data);
    console.log('Emit event that a new user is created ' + data);
  }

  buttonClicked(card: string) {
    console.log('Card ' + card + ' clicked!'); // Add this score to the object ?
  }
}
