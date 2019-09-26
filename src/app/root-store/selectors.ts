import { createSelector, MemoizedSelector } from "@ngrx/store";
import { UsersStoreSelectors } from "./users-store";
import { UserStoreSelectors } from "./user-store";

export const selectAppIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  UsersStoreSelectors.selectUsersAreLoading,
  UserStoreSelectors.selectUserIsLoading,
  (usersAreLoading: boolean, userIsLoading: boolean) => {
    return usersAreLoading || userIsLoading;
  }
);
