import {Injectable} from "@angular/core";
import {io} from "socket.io-client";
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import {User} from "./model/user";
import { deprecate } from "util";

@Injectable({providedIn: 'root'})
// @deprecated
export class UserService {
  private socket:any;

  public message$: BehaviorSubject<any> = new BehaviorSubject('');

  
  public singleMessage$: BehaviorSubject<any> = new BehaviorSubject('');

  receivedUserArray: User[]= [];

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  /**
   * user filled in name, now create an JSON object with username and add it to existing JSON Array
   */
  private readonly newUserCreated = 'new_user_created';

  
  private readonly userAddedEvent = 'new_user_added';
  private readonly singleUserAddedEvent = 'single_new_user_added';


  createUser(userData: string) {
    this.socket.emit(this.newUserCreated, userData);
    console.log("emitting event that user is created: " + userData );
  }

  
  public onCreatedUser = () => {
    this.socket.on(this.userAddedEvent, (message:any) =>{
      let jsonObject: User[] = JSON.parse(message);
      this.message$.next(JSON.parse(message));
      console.log("user message in service: "+message)

  
      jsonObject.forEach(element => {
        if(!this.receivedUserArray.includes(element)){
            this.receivedUserArray.push(element);
        }

        // console.log("The entire user", element);
        // console.log("The user name",element.name);
        // console.log("The user score",element.selectedScore);
      });

        console.log("All received users: ", this.receivedUserArray)
      // console.log('Received event that a new user was added.', JSON.parse(message))
    });


    //todo: fix issue in observable that destroys the json string. Unable to parse it by board.component
    return this.message$.asObservable();
  };

  public onSingleCreatedUser = () => {
    this.socket.on(this.singleUserAddedEvent, (message:any) =>{
      // let jsonObject: User[] = JSON.parse(message);
      this.singleMessage$.next(JSON.parse(message));
      console.log("received SINGLE user in service: "+message)
    })
    return this.singleMessage$.asObservable();
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
