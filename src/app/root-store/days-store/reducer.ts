import { Actions, ActionTypes } from './actions';
import { dayAdapter, initialState, State } from './state';

export function daysReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOAD_DAYS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_DAYS_SUCCESS: {
            return dayAdapter.addAll(action.payload.days, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.LOAD_DAYS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.UPDATE_CURRENT_DAY_ID_SUCCESS: {
            return {
                ...state,
                currentDayId: action.payload.dayId
            };
        }
        default: {
            return state;
        }
    }
}