import { createSelector, MemoizedSelector } from "@ngrx/store";
import { UsersStoreSelectors } from "./users-store";
import { UserStoreSelectors } from "./user-store";
import { DaysStoreSelectors } from "./days-store";

export const selectAppIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  UsersStoreSelectors.selectUsersAreLoading,
  UserStoreSelectors.selectUserIsLoading,
  DaysStoreSelectors.selectDaysAreLoading,
  (usersAreLoading: boolean, userIsLoading: boolean, daysAreLoading: boolean) => {
    return usersAreLoading || userIsLoading || daysAreLoading;
  }
);
