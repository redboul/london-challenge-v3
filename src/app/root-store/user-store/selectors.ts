import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { State } from './state';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsUserAuthenticated = (state: State): boolean => !!state.user;

export const selectUsersState: MemoizedSelector<
    object,
    State
> = createFeatureSelector<State>('user');

export const selectUsersError: MemoizedSelector<object, any> = 
    createSelector(
        selectUsersState,
        getError
    );

export const selectUsersIsAuthenticaed: MemoizedSelector<object, boolean> =
    createSelector(
        selectUsersState,
        getIsUserAuthenticated
    );

export const selectUsersAreLoading: MemoizedSelector<object, boolean> = 
    createSelector(
        selectUsersState,
        getIsLoading
    );