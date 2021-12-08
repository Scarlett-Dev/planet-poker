import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

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
    } else {
      //TODO: Show error
    }
  }

//TODO: 
  generateUniqueUserId(name:String){
    //      - Generate userId and append to name with #
  }

}


export enum Gamemode {
  TShirt = 'T-Shirt',
  Standard = 'Standard',
}
