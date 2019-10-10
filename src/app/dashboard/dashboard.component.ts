import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, UsersStoreSelectors, UsersStoreActions } from '../root-store';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users$: Observable<User[]>;
  hasUsers$: Observable<Boolean>;
  constructor(
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.users$ = this.store$.select(
      UsersStoreSelectors.selectAllUsers
    );
    this.hasUsers$ = this.store$.select(
      UsersStoreSelectors.selectUsersHasAny
    );
  }
}
