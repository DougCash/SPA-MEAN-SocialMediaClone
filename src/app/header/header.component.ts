import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    //This is important to grab, we change the header based on logged in or not (if not logged in, can't see 'create post')
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
