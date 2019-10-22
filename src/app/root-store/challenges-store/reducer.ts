import { Actions, ActionTypes } from './actions';
import { challengesAdapter, initialState, State } from './state';

export function challengesReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOAD_CHALLENGES_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_CHALLENGES_SUCCESS: {
            return challengesAdapter.addAll(action.payload.challenges, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.LOAD_CHALLENGES_FAILURE: {
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