import { Action } from "@ngrx/store";
import { FulfilledChallenge } from "../../fulfilled-challenge";

export enum ActionTypes {
  LOAD_FULFILLED_CHALLENGES_REQUEST = "Fulfilled Challenges Load Request",
  LOAD_FULFILLED_CHALLENGES_FAILURE = "Fulfilled Challenges Load Failure",
  LOAD_FULFILLED_CHALLENGES_SUCCESS = "Fulfilled Challenges Load Success",
  ADD_FULFILLED_CHALLENGE_REQUEST = "Fulfilled Challenge Add Request",
  ADD_FULFILLED_CHALLENGE_FAILURE = "Fulfilled Challenge Add Failure",
  ADD_FULFILLED_CHALLENGE_SUCCESS = "Fulfilled Challenge Add Success"
}

export class LoadFulfilledChallengesRequestAction implements Action {
  readonly type = ActionTypes.LOAD_FULFILLED_CHALLENGES_REQUEST;
  constructor(public payload: { email: string }) {}
}

export class LoadFulfilledChallengesFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FULFILLED_CHALLENGES_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadFulfilledChallengesSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_FULFILLED_CHALLENGES_SUCCESS;
  constructor(public payload: { fulfilledChallenges: FulfilledChallenge[] }) {}
}

export class AddFulfilledChallengeRequestAction implements Action {
  readonly type = ActionTypes.ADD_FULFILLED_CHALLENGE_REQUEST;
  constructor(
    public payload: { email: string; fulfilledChallenge: FulfilledChallenge }
  ) {}
}

export class AddFulfilledChallengeFailureAction implements Action {
  readonly type = ActionTypes.ADD_FULFILLED_CHALLENGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class AddFulfilledChallengeSuccessAction implements Action {
  readonly type = ActionTypes.ADD_FULFILLED_CHALLENGE_SUCCESS;
  constructor(public payload: { fulfilledChallenge: FulfilledChallenge }) {}
}

export type Actions =
  | LoadFulfilledChallengesRequestAction
  | LoadFulfilledChallengesFailureAction
  | LoadFulfilledChallengesSuccessAction
  | AddFulfilledChallengeRequestAction
  | AddFulfilledChallengeFailureAction
  | AddFulfilledChallengeSuccessAction;
