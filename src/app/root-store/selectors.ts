import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UsersStoreSelectors } from './users-store';
import { selectUsersHasAny } from './users-store/selectors';


export const selectError: MemoizedSelector<object, string> = createSelector(
  UsersStoreSelectors.selectUsersError,
  (usersError: string) => {
    return usersError;
  }
);

export const selectHasAnyUsers: MemoizedSelector<
  object,
  boolean
> = createSelector(
  UsersStoreSelectors.selectUsersHasAny,
  (hasAny: boolean) => {
    return hasAny;
  }
);

export const selectUsersAreLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  UsersStoreSelectors.selectUsersAreLoading,
  (areLoading: boolean) => {
    return areLoading;
  }
);