import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";
import * as featureActions from "./actions";
import { ChallengesService } from "../../challenges.service";
import { FulfilledChallengesService } from "../../fulfilled-challenges.service";

@Injectable()
export class FulfilledChallengesStoreEffects {
  constructor(
    private fulfilledChallengesService: FulfilledChallengesService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadFulfilledChallengesRequestAction>(
      featureActions.ActionTypes.LOAD_FULFILLED_CHALLENGES_REQUEST
    ),
    switchMap(action =>
      this.fulfilledChallengesService
        .retrieveFulfilledChallenges(action.payload.email)
        .then(
          fulfilledChallenges =>
            new featureActions.LoadFulfilledChallengesSuccessAction({
              fulfilledChallenges
            })
        )
        .catch(
          error =>
            new featureActions.LoadFulfilledChallengesFailureAction({ error })
        )
    )
  );
  @Effect()
  addFulfilledChallengeRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.AddFulfilledChallengeRequestAction>(
      featureActions.ActionTypes.ADD_FULFILLED_CHALLENGE_REQUEST
    ),
    switchMap(action =>
      this.fulfilledChallengesService
        .submitFulfillChallenge(
          action.payload.email,
          action.payload.fulfilledChallenge
        )
        .then(
          () =>
            new featureActions.AddFulfilledChallengeSuccessAction({
              fulfilledChallenge: action.payload.fulfilledChallenge
            })
        )
        .catch(
          error =>
            new featureActions.AddFulfilledChallengeFailureAction({ error })
        )
    )
  );
}
