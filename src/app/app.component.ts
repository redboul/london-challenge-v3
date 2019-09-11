import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AppStatusService } from './app-status.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private appStatusService: AppStatusService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.currentUserSubscription = this.userService.currentUser$.pipe(filter(u => !!u)).subscribe(u => this.currentUser = u);
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
  isAppWorking() {
    return this.appStatusService.isWorking();
  }
}
