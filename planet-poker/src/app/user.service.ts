import {Injectable} from "@angular/core";
import {io} from "socket.io-client";
import { BehaviorSubject, from, Observable } from 'rxjs';
import {User} from "./model/user";

@Injectable({providedIn: 'root'})
export class UserService {
  private socket:any;

  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  /**
   * user filled in name, now create an JSON object with username and add it to existing JSON Array
   */
  private readonly newUserCreated = 'new_user_created';

  
  private readonly userAddedEvent = 'new_user_added';


  createUser(userData: string) {
    this.socket.emit(this.newUserCreated, userData);
    console.log("emitting event that user is created: " + userData );
  }

  public onCreatedUser = () => {
    this.socket.on(this.userAddedEvent, (message:string) =>{
      let jsonObject: User[] = JSON.parse(message);
      this.message$.next(message);
  
      jsonObject.forEach(element => {
        console.log("The entire user", element);
        console.log("The user name",element.name);
        console.log("The user score",element.selectedScore);
      });

      console.log('Received event that a new user was added.', JSON.parse(message))
    });
    
    return this.message$.asObservable();
  };

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
