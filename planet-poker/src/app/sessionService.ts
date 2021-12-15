import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SessionUserData} from './model/sessionUserData';
import {map} from 'rxjs/operators';
import {Subject, Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class SessionService {
//   private posts: Post[] = [];
//   private postsUpdated = new Subject<Post[]>();
//   private matTableUpdated = new Subject<Post[]>();
// {posts: Post[]; }
// Production
//   postsUrl = 'https://us-central1-nodebackend-c8e6f.cloudfunctions.net/app/';
//   insertPostsUrl = 'https://us-central1-nodebackend-c8e6f.cloudfunctions.net/app/createpost';
//   deleteById = 'https://us-central1-nodebackend-c8e6f.cloudfunctions.net/app/';

  // //Local Dev
  insertSessionDataUrl = 'http://localhost:3000/api/sessions/createSession';
  // postsUrl = 'http://localhost:8080/api/posts/';
  // deleteById = 'http://localhost:8080/api/posts/';


  constructor(private http: HttpClient,
              private router: Router) {
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

  insertPost(username: string, selectedScore: string) {
    console.log("Flow: 2. posts service insertPost")
    console.log(username, selectedScore)
    // const postData = new FormData();
    // postData.append("title", title);
    // postData.append("description", description)
    //
    // new Response(postData).text().then(console.log);

    const params = new HttpParams()
      .set('username', username)
      .set('selectedScore', selectedScore);

    console.log("Params after setting them: ", params.toString());
    // const body = JSON.stringify(params);

    // console.log(title, description)
    // //new Response(postData).text().then(console.log);
    // console.log("params: " + params.toString());

    this.http
      .post<{ message: string, session: SessionUserData }>(
        this.insertSessionDataUrl
        , params)
      .subscribe(response => {
        console.log("the response: ", response);

          this.router.navigate(["/"]);

      });


    console.log("after http request Insert")


  }

//   getPostsUpdateListener() {
//     console.log("updatelistener");
//     return this.postsUpdated.asObservable();
//   }
}
