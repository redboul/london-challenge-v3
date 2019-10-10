import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { AppStatusService } from "./app-status.service";
import { filter, tap } from "rxjs/operators";
import { Subscription, Observable } from "rxjs";
import { User } from "./user";
import { RootStoreState, RootStoreSelectors, UsersStoreActions } from "./root-store";
import { Store } from "@ngrx/store";
import { UserStoreSelectors, UserStoreActions } from "./root-store/user-store";
import { selectUsersState } from "./root-store/user-store/selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  currentTeam$: Observable<User>;
  isAuthenticated$: Observable<boolean>;
  isAppLoading$: Observable<boolean>;
  constructor(private store$: Store<RootStoreState.State>) {}
  ngOnInit() {
    this.currentTeam$ = this.store$.select(
      UserStoreSelectors.selectCurrentTeam
    );
    this.isAuthenticated$ = this.store$.select(
      UserStoreSelectors.selectUsersIsAuthenticated
    );
    this.isAppLoading$ = this.store$.select(
      RootStoreSelectors.selectAppIsLoading
    );
    this.store$.dispatch(new UsersStoreActions.LoadUsersRequestAction());
  }
  logout() {
    this.store$.dispatch(new UserStoreActions.LogoutUserAction());
  }
}
