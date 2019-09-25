import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { userAdapter, State } from './state';
import { User } from '../../user';

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectUsersState: MemoizedSelector<
    object,
    State
> = createFeatureSelector<State>('users');

export const selectAllUsers: (state: object) => User[] = userAdapter.getSelectors(selectUsersState).selectAll;

export const selectUserById = (id: string) =>
    createSelector(
        this.selectAllUsers,
        (allUsers: User[]) => {
        if (allUsers) {
            return allUsers.find(p => p.id === id);
        } else {
            return null;
        }
        }
    );

export const selectUsersError: MemoizedSelector<object, any> = 
    createSelector(
        selectUsersState,
        getError
    );

export const selectUsersHasAny: MemoizedSelector<object, boolean> =
    createSelector(
        userAdapter.getSelectors(selectUsersState).selectTotal,
        (totalUsers: number) => totalUsers > 0
    );

export const selectUsersAreLoading: MemoizedSelector<object, boolean> = 
    createSelector(
        selectUsersState,
        getIsLoading
    );