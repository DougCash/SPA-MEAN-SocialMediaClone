import { Post } from './posts.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient} from "@angular/common/http"
import { stringify } from '@angular/compiler/src/util';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {

  }

  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content
    };
    this.http.post<{message: string, postID: string}>('http://localhost:3000/api/posts', post).subscribe((responseData) => {
      const postID = responseData.postID;
      post.id = postID;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postID: string){
    this.http.delete('http://localhost:3000/api/posts/' + postID).subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postID);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
