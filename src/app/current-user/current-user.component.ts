import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Store } from '@ngrx/store';
import { RootStoreState } from '../root-store';
import { UserStoreSelectors } from '../root-store/user-store';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css'],
})
export class CurrentUserComponent implements OnInit {
  currentTeam$: Observable<User>;
  logo$: Observable<string>;
  constructor(private store$: Store<RootStoreState.State>) {}

  ngOnInit() {
    this.currentTeam$ = this.store$.select(
      UserStoreSelectors.selectCurrentTeam
    );
    this.logo$ = this.currentTeam$.pipe(
      filter(t => !!t && !!t.logo),
      map(team => `/assets/images/${team.logo}`)
    )
  }
}
