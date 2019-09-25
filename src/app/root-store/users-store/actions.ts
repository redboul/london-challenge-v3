import { Action } from '@ngrx/store';
import { User } from '../../user';

export enum ActionTypes {
    LOAD_USERS_REQUEST = 'Users Load Request',
    LOAD_USERS_FAILURE = 'Users Load Failure',
    LOAD_USERS_SUCCESS = 'Users Load Success'
}

export class LoadUsersRequestAction implements Action {
    readonly type = ActionTypes.LOAD_USERS_REQUEST;
}

export class LoadUsersFailureAction implements Action {
    readonly type = ActionTypes.LOAD_USERS_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class LoadUsersSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_USERS_SUCCESS;
    constructor(public payload: { users: User[] }) {}
}

export type Actions = LoadUsersRequestAction | LoadUsersFailureAction | LoadUsersSuccessAction;
