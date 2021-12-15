import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { SessionService } from '../sessionService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  isNewSession: boolean = false;
  Gamemode = Gamemode;

  user = new FormControl('', [Validators.required]);
  sessionId = new FormControl('', [Validators.required]);
  gamemodeSelection = new FormControl('', [Validators.required]);

 constructor (public sessionsService:SessionService) {
  }


  onToggleCheckBox() {
    this.isNewSession = !this.isNewSession;
  }

  //TODO: UPDATE to db with user. generateUniqueUserId()
  
  onClickJoinSession() {
    if (this.user.valid && this.sessionId.valid) {
      //TODO: Reroute user to the board within the new session
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


 //TODO: POST to DB with sessionId and generateUniqueUserId()  -> score empty
  onClickCreateSession() {
    if (this.user.valid && this.gamemodeSelection.valid) {
      this.sessionsService.insertPost(this.generateUniqueUserId(this.user.value), "0");
      // console.log(
      //   'The user ' +
      //     this.user.value +
      //     ' is creating the session ' +
      //     randomSessionId +
      //     ' with game mode ' +
      //     this.gamemodeSelection.value
      // );
    } else {
      //TODO: Show error
    }
  }

/**
 *  Generate userId and append to name with a #
 * @param name the username to use for generating a unique username
 * @returns unique userId
 */
  generateUniqueUserId(name:String) {
    let randomUserId = Math.floor(Math.random() * (99999 - 1) + 1);
    return name + "#" + randomUserId
  }

}


export enum Gamemode {
  TShirt = 'T-Shirt',
  Standard = 'Standard',
}
