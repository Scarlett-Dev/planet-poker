export class User {

  constructor(
    public name: string,
    public selectedScore: number
  ) {

  }

  getName(): string {
    return this.name;
  }

  getSelectedScore(): number {
    return this.selectedScore;
  }

  // toJSON is automatically used by JSON.stringify
  toJSON(): UserJSON {
    // copy all fields from `this` to an empty object and return in
    return Object.assign(this);
  }

  // fromJSON is used to convert an serialized version
  // of the User to an instance of the class
  static fromJSON(json: UserJSON | string): User {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, User.reviver);
    } else {
      // create an instance of the User class
      let user = Object.create(User.prototype);
      // copy all the fields from the json object
      return Object.assign(user, json, {});
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call User.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === "" ? User.fromJSON(value) : value;
  }
}

// A representation of User's data that can be converted to
// and from JSON without being altered.
interface UserJSON {
  name: string;
  selectedScore: number;
}
