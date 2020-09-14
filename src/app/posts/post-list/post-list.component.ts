import { Component, Input, OnInit, OnDestroy} from "@angular/core";
import { Post } from "../posts.model"
import { PostsService } from "../posts.service"
import { Subscription } from "rxjs"

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: 'First Post', content: 'This is the first post'},
  //   {title: 'Second Post', content: 'This is the second post'},
  //   {title: 'Third Post', content: 'This is the third post'},
  //   {title: 'Fourth Post', content: 'This is the fourth post'}
  // ];
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;


  constructor(public postsService: PostsService) {

  }

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  onDelete(postID: string){
    this.postsService.deletePost(postID);
  }
}
