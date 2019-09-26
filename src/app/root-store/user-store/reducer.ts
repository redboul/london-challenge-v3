import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

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
                user: action.payload.user
            };
        }
        case ActionTypes.LOAD_USER_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        default: {
            return state;
        }
    }
}