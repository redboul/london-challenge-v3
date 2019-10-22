import { Actions, ActionTypes } from './actions';
import { initialState, State, fulfilledChallengesAdapter } from './state';

export function fulfilledChallengesReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOAD_FULFILLED_CHALLENGES_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_FULFILLED_CHALLENGES_SUCCESS: {
            return fulfilledChallengesAdapter.addAll(action.payload.fulfilledChallenges, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.LOAD_FULFILLED_CHALLENGES_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.ADD_FULFILLED_CHALLENGE_REQUEST: {
            return {
                ...state,
                isAdding: true,
                errorOnAdd: null
            };
        }
        case ActionTypes.ADD_FULFILLED_CHALLENGE_SUCCESS: {
            return fulfilledChallengesAdapter.addOne(action.payload.fulfilledChallenge, {
                ...state,
                isAdding: false,
                errorOnAdd: null
            });
        }
        case ActionTypes.ADD_FULFILLED_CHALLENGE_FAILURE: {
            return {
                ...state,
                isAdding: false,
                errorOnAdd: action.payload.error
            };
        }
        default: {
            return state;
        }
    }
}