import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { State } from './state';
import { User, AccountType } from '../../user';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getIsUserAuthenticated = (state: State): boolean => !!state.authenticatedUser;

export const getCurrentTeam = (state: State): User => state.currentTeam;

export const isAuthenticatedUserAuthorizedToAccessTeam = (state: State): boolean => 
    state.currentTeam && state.currentTeam.uuid &&
        (state.currentTeam.uuid === state.authenticatedUser.uuid ||
            state.authenticatedUser.accountType === AccountType.admin);

export const selectUsersState: MemoizedSelector<object, State> =
    createFeatureSelector<State>('user');

export const selectUsersError: MemoizedSelector<object, any> = 
    createSelector(selectUsersState,getError);

export const selectUsersIsAuthenticated: MemoizedSelector<object, boolean> =
    createSelector(selectUsersState, getIsUserAuthenticated);

export const selectUserIsLoading: MemoizedSelector<object, boolean> = 
    createSelector(selectUsersState, getIsLoading);

export const selectCurrentTeam: MemoizedSelector<object, User> = 
    createSelector(selectUsersState, getCurrentTeam);

export const selectIsAuthenticatedUserAuthorizedToAccessTeam: MemoizedSelector<object, boolean> = 
    createSelector(selectUsersState, isAuthenticatedUserAuthorizedToAccessTeam);