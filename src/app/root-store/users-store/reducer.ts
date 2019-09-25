import { Actions, ActionTypes } from './actions';
import { userAdapter, initialState, State } from './state';

export function userReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOAD_USERS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_USERS_SUCCESS: {
            return userAdapter.addAll(action.payload.users, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.LOAD_USERS_FAILURE: {
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