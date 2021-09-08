import {Injectable} from "@angular/core";
import {io} from "socket.io-client";
import {BehaviorSubject, from, Observable, Subject} from 'rxjs';
import {User} from "./model/user";
import {throwNullPortalOutletError} from "@angular/cdk/portal/portal-errors";

@Injectable({providedIn: 'root'})
export class UserService {
  private socket:any;
  users: User[] = [];

  newUser: User | undefined;


  private usersUpdated = new Subject<User[]>();
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  /**
   * user filled in name, now create an JSON object with username and add it to existing JSON Array
   */
  private readonly newUserCreated = 'new_user_created';


  private readonly userAddedEvent = 'new_user_added';
  // private newUser: User;


  createUser(userData: string) {
    this.socket.emit(this.newUserCreated, userData);
    console.log("emitting event that user is created: " + userData );
  }

  public onCreatedUser = () => {
    this.socket.on(this.userAddedEvent, (message:string) =>{
      let jsonObject: User[] = JSON.parse(message);
      console.log("JSONOBJECT" + jsonObject);
      this.message$.next(message);


      //TODO this actually works, but copies users too much...
      // so If the user DOESNT exist, we want to add it to the array!
      jsonObject.forEach(element => {
        if(this.users.includes(element)){
          console.log("user exists")
        }
        else{
          this.users.push(element);
          console.log("*/*/*/*/" + this.usersUpdated.next([...this.users]));

        }




        console.log( "LENGTH OF" + this.users.length);

        // this.users.splice(0, this.users.length);
        // console.log("The entire user", element);
        console.log("The user name",element.name);
        console.log("The user score",element.selectedScore);

        this.newUser = new User(element.name, 0);
        this.users.push(this.newUser);

      });


      // this.users = jsonObject;
      // this.usersUpdated.next([...message]);



      //TODO this message needs to be accessible in the board component.
      console.log('Received event that a new user was added.', JSON.parse(message));
      // console.log(this.usersUpdated.next([...this.users]));
    });
    console.log("Before return");
    // this.usersUpdated.next([...this.users]);
    return this.message$.asObservable();
  };

    getUpdateListener(){
      console.log("updatelistener activated")
      return this.usersUpdated.asObservable();

    }
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
