import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, filter, tap, map } from "rxjs/operators";
import * as userActions from "./actions";
import { UserService } from "../../user.service";
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class UserStoreEffects {
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private actions$: Actions) {}

  @Effect()
  loginUserRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoginUserRequestAction>(
      userActions.ActionTypes.LOGIN_USER_REQUEST
    ),
    switchMap(action => 
      this.authenticationService.login( { email: action.payload.email, password: action.payload.password})
        .then(userCredentials => new userActions.LoginUserSuccessAction())
        .catch(error => new userActions.LoadUserFailureAction({ error }))
    )
  );

  @Effect()
  getUserRightsRequestEffect$: Observable<Action> = 
    this.authenticationService.authenticatedUser$.pipe(
    filter(user => !!user),
    switchMap(user => 
      this.userService.getUserRight(user.email)
        .then(user => new userActions.LoadUserSuccessAction({ user }))
        .catch(error => new userActions.LoadUserFailureAction({ error }))
    )
  );

  @Effect()
  setCurrentTeamEffect$: Observable<Action> = 
    this.actions$.pipe(
      ofType<userActions.LoadUserSuccessAction>(
        userActions.ActionTypes.LOAD_USER_SUCCESS
      ),
      map(action => 
        new userActions.SetCurrentTeamAction({ team: action.payload.user })
      )
  );

  @Effect({ dispatch: false })
  logoutUserEffect$: Observable<Action> = 
    this.actions$.pipe(
      ofType<userActions.LogoutUserAction>(
        userActions.ActionTypes.LOGOUT_USER
      ),
      tap(() => this.authenticationService.logout()),
      tap(() => this.router.navigate(['/']))
    );
}
