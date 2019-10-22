import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";
import * as featureActions from "./actions";
import { ChallengesService } from "../../challenges.service";

@Injectable()
export class ChallengesStoreEffects {
  constructor(private challengesService: ChallengesService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadChallengesRequestAction>(
      featureActions.ActionTypes.LOAD_CHALLENGES_REQUEST
    ),
    startWith(new featureActions.LoadChallengesRequestAction()),
    switchMap(action =>
      this.challengesService
        .retrieveChallenges()
        .then(challenges => new featureActions.LoadChallengesSuccessAction({ challenges }))
        .catch(error => new featureActions.LoadChallengesFailureAction({ error }))
    )
  );
}
