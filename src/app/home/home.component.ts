import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { RootStoreState } from '../root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserStoreSelectors } from '../root-store/user-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store$.select(
      UserStoreSelectors.selectUsersIsAuthenticated
    );
    this.isAuthenticated$.subscribe(value => console.log('is user authicated:', value));
  }
}
