import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../model/user';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from "@angular/router";
import {Session} from "../model/session";
import {SessionService} from "../sessionService";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  gameMode = '';
  sessionId = '';
  currentUser = '';
  currentDbUser = '';

  userArray: User[] = [];

  scoresByUserArray: string[] = [];
  //TODO: Should be populated with get statement from DB. Also needs to be refreshed.
  // by defeault users should be visible but scores shouldn't. (Hide with a random emoji?)
  scoresByUserTable = new MatTableDataSource<User>();
  columnsToDisplay: string[] = ['name', 'score'];

  tshirtArray = ['S', 'M', 'L', 'XL', 'XXL'];
  arraystandard = ['1', '2', '3', '5', '8', '13', '20', '40', '100'];
  private sessionSub!: Subscription;
  retrievedUsers: User[] = [];

  constructor(public sessionService: SessionService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    let createdSession: Session;

    this.route.queryParams.subscribe(params => {
      createdSession = Session.fromJSON(params.prop)
      console.log("New created session in board: ", createdSession)
      this.setGamemode(createdSession.getGamemode);
      this.setRoomId(createdSession.getSessionId);

      //Sexy Solution ;)
      this.setCurrentUser(params.currentUser)
    })
  }

  getGameMode() {
    if (this.gameMode === 'tShirt') {
      return this.tshirtArray;
    } else {
      return this.arraystandard;
    }
  }

  setGamemode(gameMode: string) {
    this.gameMode = gameMode;
  }

  setRoomId(sessionId: string) {
    this.sessionId = sessionId;
  }

  setCurrentUser(username: string) {
    console.log("Setting username in board.")
    this.currentDbUser = username;
    this.currentUser = this.currentDbUser.split('#')[0];
  }

  buttonClicked(card: string) {
    console.log('Card ' + card + ' clicked!');
    console.log("Updating score for user in db")
    this.sessionService.updateUserScoreInSession(this.currentDbUser, card, this.sessionId);
  }

  resetScores() {
    console.log("Received request to reset all the user scores in the session.")
    this.sessionService.resetAllUserScores(this.sessionId);
  }

  //TODO: connect to toggle btn.
  showScores() {
    //TODO: Show score
    console.log("The quick and dirty retrieved users :", this.sessionService.retrievedUsers)


    // let users: User[]
    //
    // users =
    this.sessionService.showScoresAndUsers(this.sessionId);
    // console.log("received users from get", this.userArray)

  }

}
