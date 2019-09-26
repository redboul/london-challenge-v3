import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, filter } from "rxjs/operators";
import * as userActions from "./actions";
import { UserService } from "../../user.service";
import { AuthenticationService } from '../../authentication.service';

@Injectable()
export class UserStoreEffects {
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
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
}
