import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { dayAdapter, State } from "./state";
import { Day } from "../../day";

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const getCurrentDayId = (state: State): string => state.currentDayId;

export const selectDaysState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("days");

export const selectAllDays: (state: object) => Day[] = dayAdapter.getSelectors(
  selectDaysState
).selectAll;

export const selectCurrentDayId: MemoizedSelector<object, string> = createSelector(
  selectDaysState,
  getCurrentDayId
);

export const selectDaysError: MemoizedSelector<object, any> = createSelector(
  selectDaysState,
  getError
);

export const selectDaysAreLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectDaysState,
  getIsLoading
);

export const selectCurrentDay: MemoizedSelector<object, Day> = 
  createSelector(
    selectAllDays,
    selectCurrentDayId,
    (allDays: Day[], dayId: string) => {
      if (allDays) {
        return allDays.find(p => p.id === dayId);
      } else {
        return null;
      }
    }
  );

export const selectDayById = (id: string) =>
  createSelector(
    selectAllDays,
    (allDays: Day[]) => {
      if (allDays) {
        return allDays.find(p => p.id === id);
      } else {
        return null;
      }
    }
  );
