import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';
import { AccountType } from '../../user';

export function userReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOGIN_USER_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                authenticatedUser: action.payload.user
            };
        }
        case ActionTypes.LOAD_USER_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.SET_CURRENT_TEAM: {
            let team = state.authenticatedUser;
            if(state.authenticatedUser 
                && state.authenticatedUser.accountType === AccountType.admin) {
                team = action.payload.team;
            }
            return {
                ...state,
                currentTeam: team
            };
        }
        case ActionTypes.LOGOUT_USER: {
            return {
                ...state,
                currentTeam: null,
                authenticatedUser: null
            };
        }
        default: {
            return state;
        }
    }
}