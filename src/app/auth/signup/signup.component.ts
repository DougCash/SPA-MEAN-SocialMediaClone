import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service'

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{
  isLoading = false;
  private authStatusSub: Subscription;
  
  //Basically signing up to ensure that they're logged in when trying to create/edit, and to handle possible sign up
  constructor(public authService: AuthService) {}

  ngOnInit(){
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
     authStatus => {
       this.isLoading = false;
     }
   );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onSignup(form: NgForm){
    console.log(form);
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }
}
