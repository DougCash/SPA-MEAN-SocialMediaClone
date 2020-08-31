import { Component, Input} from "@angular/core";
import { Post } from "../posts.model"

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent{
  // posts = [
  //   {title: 'First Post', content: 'This is the first post'},
  //   {title: 'Second Post', content: 'This is the second post'},
  //   {title: 'Third Post', content: 'This is the third post'},
  //   {title: 'Fourth Post', content: 'This is the fourth post'}
  // ];
  @Input() posts: Post[] = [];
}
