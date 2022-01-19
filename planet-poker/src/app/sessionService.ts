import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {SessionUserData} from './model/sessionUserData';
import {map} from 'rxjs/operators';
import {Subject, Observable} from 'rxjs';
import {User} from "./model/user";
import * as mongoose from "mongoose";
import {Session} from "./model/session";

// import {Session} from "./model/session";


@Injectable({providedIn: 'root'})
export class SessionService {

//   private posts: Post[] = [];
  private sessionsUpdated = new Subject<User[]>();
//   private matTableUpdated = new Subject<Post[]>();
// {posts: Post[]; }
// Production
//   postsUrl = 'https://us-central1-nodebackend-c8e6f.cloudfunctions.net/app/';
//   insertPostsUrl = 'https://us-central1-nodebackend-c8e6f.cloudfunctions.net/app/createpost';
//   deleteById = 'https://us-central1-nodebackend-c8e6f.cloudfunctions.net/app/';

  // //Local Dev
  insertSessionDataUrl = 'http://localhost:3000/api/sessions/createSession';
  joinSessionDataUrl = 'http://localhost:3000/api/sessions/';
  updateUserScoreDataUrl = 'http://localhost:3000/api/sessions/update/';
  resetSessionDataUrl = 'http://localhost:3000/api/sessions/reset/';
  fetchSessionDataUrl = 'http://localhost:3000/api/sessions/getSession/';
  // postsUrl = 'http://localhost:8080/api/posts/';
  // deleteById = 'http://localhost:8080/api/posts/';

  public retrievedUsers: User[] = [];

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {
  }


//   getPosts() {

//     console.log('getting the posts NEW');
//     return this.http
//       .get<{ message: string, posts: any }>(
//         this.postsUrl
//       )
//       .pipe(map((postData) => {
//         return postData.posts.map(post => {
//           return {
//             id: post._id,
//             title: post.title,
//             description: post.description
//           };
//         });
//       }))
//       .subscribe(transformedPosts => {
//         console.log('content of message: ' + JSON.stringify(transformedPosts));
//         this.posts = transformedPosts;
//         this.postsUpdated.next([...this.posts]);
//       });
//     console.log("After getting the posts from server");
//   }

//  deletePost(id: string) {
//     console.log(this.deleteById + id);
//     console.log(id);

//     this.http
//       .delete(this.deleteById + id)
//       .subscribe(() => {
//         this.posts.forEach((item: Post, index) => {
//           console.log(item.id)
//           console.log(item.description)
//           if (item.id === id) {
//             console.log("item.id")
//             console.log("id matches" + id)
//             this.posts.splice(index, 1)
//             console.log("Item: " + item + "deleted")
//           }
//         })
//         this.postsUpdated.next([...this.posts]);
//         console.log(this.posts)
//       });

//     console.log("after delete post");


//   }


  //TODO: param username and selectedScore or just User obj?
  /**
   * Add a new user to the session in the database
   *
   * @param username the unique generated username
   * @param selectedScore the score that needs to be set in the db
   * @param sessionId the unique ID of the session that the user is currently in
   */
  addNewUserToExistingSession(username: string, selectedScore: string, sessionId: string) {
    console.log("Call to DB for adding user to a record (room) for the session ", sessionId)
    let newUser = new User(username, selectedScore);
    this.http.patch(this.joinSessionDataUrl + sessionId, newUser).subscribe(response => {
      console.log("the response: ", response);

      //TODO: navigate to board with session id X
      this.router.navigate(["/board"]);
    });

  }

  /**
   * update score for the user in the database
   *
   * @param username the unique generated username
   * @param selectedScore the score that needs to be set in the db
   * @param sessionId the unique ID of the session that the user is currently in
   */
  updateUserScoreInSession(username: string, selectedScore: string, sessionId: string) {
    console.log("Call to DB for updating the score to ", selectedScore, " for the user (", username, ")");
    let currentUser = new User(username, selectedScore);
    this.http.patch(this.updateUserScoreDataUrl + sessionId, currentUser).subscribe(response => {
      // console.log("the response: ", response);

    });

  }

  /**
   * Reset all the selectedScore to 0 within the given session
   * @param sessionId the id of the session in which all the scores must be set to 0
   */
  resetAllUserScores(sessionId: string) {
    console.log("Resetting all the scores in the session", sessionId)
    this.http.patch(this.resetSessionDataUrl + sessionId, sessionId).subscribe(response => {
      // console.log("the response: ", response);
    });
  }

  // showScoresAndUsers(sessionId: string):User[]{
  showScoresAndUsers(sessionId: string) {
    let currentSession: Session;
    console.log("Fetching all the users and scores in the session service")

    this.http
      .get(this.fetchSessionDataUrl + sessionId).subscribe(response => {
      console.log("response get: ", response);
      let test = JSON.stringify(response)
      currentSession = Session.fromJSON(test);

      console.log("response get: ", currentSession.users);
      this.retrievedUsers = currentSession.users;
      this.sessionsUpdated.next([...this.retrievedUsers])


      //  this.router.navigate(["/board", currentSession],
      //    {
      //      queryParams: {
      //        prop: JSON.stringify(currentSession),
      //        currentUser: currentUser
      //      }
      //    });
      // })
      // currentSession = Session.fromJSON(JSON.stringify(response));
      // return currentSession
    })
    this.sessionsUpdated.forEach( value => {
      console.log("value in loop ", value)
    })
    console.log("outside function: " + this.sessionsUpdated);
  }

  //TODO implement:
  fetchSessionData(sessionId: string) {
    console.log("Fetching all session data for session", sessionId)
    this.http.get(this.fetchSessionDataUrl + sessionId).subscribe(response => {
      // console.log("the response: ", response);
      this.router.navigate(["/"]);
    });
  }

  //TODO: selectedScore is always null here.
  /**
   * Create a new session and add the user that created the session.
   * @param gameMode the game mode of the session
   * @param username the name of the user
   * @param selectedScore the selectedScore
   */
  createNewSessionWithUser(gameMode: string, username: string, selectedScore: string) {
    let createdSession: Session;

    console.log("Creating session with mode: ", gameMode, " and username: ", username);
    // let newSession = new Session(new Array(new User(username, selectedScore)), gameMode, "");
    let newSession = new Session([new User(username, selectedScore)], gameMode, "");

    this.http.post(this.insertSessionDataUrl, newSession)
      .subscribe(response => {
        console.log("the response: ", response);
        console.log("sexy string: ", JSON.stringify(response))
        let resp = Session.fromJSON(JSON.stringify(response))
        console.log("Session object from response: ", resp.getSessionId)


        createdSession = Session.fromJSON(JSON.stringify(response));

        //  sexy string:  {"gamemode":"standard","users":[{"username":"Charmander#46343","selectedScore":"0","_id":"61df2234eed73431d5a18e8a"}],"_id":"61df2234eed73431d5a18e89","__v":0}
        console.log("createdSession used for navigate: ", createdSession.toJSON())

        // here we navigate to different component and pass
        this.router.navigate(["/board", createdSession],
          {
            queryParams: {
              prop: JSON.stringify(createdSession),
              currentUser: username
            }
          });
      })

    //TODO: navigate to board with session id X
    // const navParams: NavigationExtras = {state: {username:}}

    //Fetch for ses

  }

  getSessionUpdateListener() {
    console.log("updatelistener");
    return this.sessionsUpdated.asObservable();
  }
}
