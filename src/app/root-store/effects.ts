import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as userActions from './user-store/actions'
import * as daysActions from './days-store/actions'

@Injectable()
export class RootStoreEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  loadDaysAfterLoginEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoginUserSuccessAction>(
        userActions.ActionTypes.LOGIN_USER_SUCCESS
    ),
    map(() => new daysActions.LoadDaysRequestAction())
  );
}
