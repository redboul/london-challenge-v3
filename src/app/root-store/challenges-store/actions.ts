import { Action } from '@ngrx/store';
import { Challenge } from '../../challenge';

export enum ActionTypes {
    LOAD_CHALLENGES_REQUEST = 'Challenges Load Request',
    LOAD_CHALLENGES_FAILURE = 'Challenges Load Failure',
    LOAD_CHALLENGES_SUCCESS = 'Challenges Load Success'
}

export class LoadChallengesRequestAction implements Action {
    readonly type = ActionTypes.LOAD_CHALLENGES_REQUEST;
}

export class LoadChallengesFailureAction implements Action {
    readonly type = ActionTypes.LOAD_CHALLENGES_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class LoadChallengesSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_CHALLENGES_SUCCESS;
    constructor(public payload: { challenges: Challenge[] }) {}
}

export type Actions = LoadChallengesRequestAction | LoadChallengesFailureAction | LoadChallengesSuccessAction;
