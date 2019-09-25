import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";
import * as featureActions from "./actions";
import { UserService } from "../../user.service";

@Injectable()
export class UsersStoreEffects {
  constructor(private userService: UserService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadUsersRequestAction>(
      featureActions.ActionTypes.LOAD_USERS_REQUEST
    ),
    startWith(new featureActions.LoadUsersRequestAction()),
    switchMap(action =>
      this.userService
        .getUsers()
        .then(users => new featureActions.LoadUsersSuccessAction({ users }))
        .catch(error => new featureActions.LoadUsersFailureAction({ error }))
    )
  );
}
