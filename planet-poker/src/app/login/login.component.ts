import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import {Session} from "../model/session";
import {User} from "../model/user";
import {UserService} from "../user.service";
import {io} from "socket.io-client";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private socket: any;
  isNewSession: boolean = false;
  Gamemode = Gamemode;

  user = new FormControl('', [Validators.required]);
  sessionId = new FormControl('', [Validators.required]);
  gamemodeSelection = new FormControl('', [Validators.required]);


  constructor(public userService: UserService) {
    this.socket = io('http://localhost:8080');
  }
  onToggleCheckBox() {
    this.isNewSession = !this.isNewSession;
  }

  onClickJoinSession() {
    if (this.user.valid && this.sessionId.valid) {
      //TODO: Show the board
      console.log(
        'The user ' +
          this.user.value +
          ' is joining the session ' +
          this.sessionId.value
      );

    } else {
      //TODO: Show error

    }
  }

  onClickCreateSession() {
    let randomSessionId = Math.floor(Math.random() * (99999 - 1) + 1);

    if (this.user.valid && this.gamemodeSelection.valid) {
      console.log(
        'The user ' +
          this.user.value +
          ' is creating the session ' +
          randomSessionId +
          ' with game mode ' +
          this.gamemodeSelection.value



      );

      const session = new Session(randomSessionId, new Array(new User(this.user.value, 0)));
      console.log(session)
      this.userService.createSession(session);

    } else {
      //TODO: Show error
    }
  }
}

export enum Gamemode {
  TShirt = 'T-Shirt',
  Standard = 'Standard',
}
