import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ROUTER_NAVIGATED, RouterNavigatedAction } from "@ngrx/router-store";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { startWith, switchMap, map } from "rxjs/operators";
import * as daysActions from "./actions";
import { DayService } from "../../day.service";

@Injectable()
export class DaysStoreEffects {
  constructor(private daysService: DayService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<daysActions.LoadDaysRequestAction>(
      daysActions.ActionTypes.LOAD_DAYS_REQUEST
    ),
    startWith(new daysActions.LoadDaysRequestAction()),
    switchMap(action =>
      this.daysService
        .getDays()
        .then(days => new daysActions.LoadDaysSuccessAction({ days }))
        .catch(error => new daysActions.LoadDaysFailureAction({ error }))
    )
  );

  @Effect()
  routerNavigatedEffect$: Observable<Action> = this.actions$.pipe(
    ofType<RouterNavigatedAction>(
      ROUTER_NAVIGATED
    ),
    map(action => new daysActions.UpdateCurrentDayIdSuccess({ dayId: action.payload.routerState.root.params.day }))
  );
}
