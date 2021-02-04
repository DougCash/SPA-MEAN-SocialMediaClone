import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostsService } from "../posts.service";
import { Post } from "../posts.model";
import { mimeType } from "./mime-type.validator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit, OnDestroy {
  //Initialize default states
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private postId: string;
  private authStatusSub: Subscription;

  //Want access to service files and routes
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  //When starting up
  ngOnInit() {
    //Check that they can even create a post
    this.authStatusSub =this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      });
    //If they're allowed, they can fill out the form with the given requirements
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    //If we're editing instead (same component)
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator
          };
          this.form.patchValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
        });
      } 
      //If we're not editing, then it must be creating
      else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }
  
  //Handles image upload
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  //Handles saving the posts (uses postsService)
  //Reset form
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }


  //Unsub when no longer needed
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}

