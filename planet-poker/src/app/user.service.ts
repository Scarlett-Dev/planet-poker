import {Injectable} from "@angular/core";
import {io} from "socket.io-client";

@Injectable({providedIn: 'root'})
export class UserService {
  private socket:any;


  constructor() {
    this.socket = io('http://localhost:3000');
    // this.socket = io.connect();
    // this.values = this.listen('mp').subscribe((messageMap) => {
    //   console.log('Received the following data with the "listen" conmmand: ', messageMap);
    // })
  }

  /**
   * user filled in name, now create an JSON object with username and add it to existing JSON Array
   */
  private readonly newUserCreated = 'new_user_created';

  /**
   *
   * @param username
   */
  createUser(userData: string) {
    // console.log("in Service ");
    this.socket.emit(this.newUserCreated, userData);
    console.log("emitting event that user is created: " + userData );
  }

  // onCreatedUser(users: string){
  //   this.socket.on()
  // }

  /**
   * set score from selected card
   */
  setScore() {

    // socket.emit("username" + 2)


  }

  /**
   * after decision made reset dea zjwik
   */
  resetScores() {


  }

  /**
   * if all users left AND session inactive for x hours close dea zjwik
   */
  closeSession() {

  }


}
