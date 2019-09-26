import { Action } from '@ngrx/store';
import { User } from '../../user';

export enum ActionTypes {
    LOGIN_USER_REQUEST = 'User Load Request',
    LOAD_USER_RIGHTS_REQUEST = 'User Rights Load Request',
    LOAD_USER_FAILURE = 'User Load Failure',
    LOAD_USER_SUCCESS = 'User Load Success',
    LOGIN_USER_SUCCESS = 'User Login Success',
    SET_CURRENT_TEAM = 'Set Current Team',
    LOGOUT_USER = 'Logout User'
}

export class LoginUserRequestAction implements Action {
    readonly type = ActionTypes.LOGIN_USER_REQUEST;
    constructor(public payload: { email: string, password: string }) {}
}

export class LoadUserRightsRequestAction implements Action {
    readonly type = ActionTypes.LOAD_USER_RIGHTS_REQUEST;
    constructor(public payload: { email: string }) {}
}

export class LoadUserFailureAction implements Action {
    readonly type = ActionTypes.LOAD_USER_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class LoginUserSuccessAction implements Action {
    readonly type = ActionTypes.LOGIN_USER_SUCCESS;
}

export class LoadUserSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_USER_SUCCESS;
    constructor(public payload: { user: User }) {}
}

export class SetCurrentTeamAction implements Action {
    readonly type = ActionTypes.SET_CURRENT_TEAM;
    constructor(public payload: { team: User }) {}
}

export class LogoutUserAction implements Action {
    readonly type = ActionTypes.LOGOUT_USER;
}

export type Actions = 
    LoginUserRequestAction | 
    LoginUserSuccessAction |
    LoadUserRightsRequestAction |
    LoadUserFailureAction |
    LoadUserSuccessAction |
    SetCurrentTeamAction |
    LogoutUserAction;
