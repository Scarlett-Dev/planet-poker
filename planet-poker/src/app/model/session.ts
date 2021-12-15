import {User} from "./user";
import { Gamemode } from "../login/login.component";
// @Deprecated 
export class Session {

  //todo: fix getter and setter methods
  //todo: make name and selectedScore private

  constructor(
    private sessionID: number,
    private joinedUsers: User[],
    private gamemode: Gamemode
  ) {

  }

  //Getters
  public get getSessionID() {
    return this.sessionID;
  }

  public get getJoinedUsers() {
    return this.joinedUsers;
  }

  public get getGamemode(){
      return this.gamemode;
  }

  // toJSON is automatically used by JSON.stringify
  toJSON(): SessionJSON {
    // copy all fields from `this` to an empty object and return in
    return Object.assign(this);
  }

  // fromJSON is used to convert an serialized version
  // of the User to an instance of the class
  static fromJSON(json: SessionJSON | string): Session {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, Session.reviver);
    } else {
      // create an instance of the User class
      let session = Object.create(Session.prototype);
      // copy all the fields from the json object
      return Object.assign(session, json, {});
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Session.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === "" ? Session.fromJSON(value) : value;
  }
}

// A representation of session data that can be converted to
// and from JSON without being altered.
interface SessionJSON {
  sessionID: number;
  joinedUsers: User[];
}