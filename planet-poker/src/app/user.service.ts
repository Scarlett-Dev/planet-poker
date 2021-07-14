import {Injectable} from "@angular/core";

@Injectable({  providedIn: 'root'})
export class UserService{

  



  /**
   * user filled in name, now create an JSON object with username and add it to existing JSON Array
   */
  /**
   *
   * @param username
   */
  createUser(username: string){
    console.log("in Service and username is : " + username);


  }

  /**
   * set score from selected card
   */
  setScore(){


  }

  /**
   * after decision made reset dea zjwik
   */
  resetScores(){


  }

  /**
   * if all users left AND session inactive for x hours close dea zjwik
   */
  closeSession(){

  }


  

}
