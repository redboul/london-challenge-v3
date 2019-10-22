import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { challengesAdapter, State } from "./state";
import { Challenge } from "../../challenge";
import { groupBy } from 'lodash';

const getError = (state: State): any => state.error;

const getIsLoading = (state: State): boolean => state.isLoading;

export const selectChallengesState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("challenges");

export const selectAllChallenges: (
  state: object
) => Challenge[] = challengesAdapter.getSelectors(selectChallengesState)
  .selectAll;

export const selectChallengeGroupedByCategory = createSelector(
      selectAllChallenges,
      (challenges: Challenge[]) => {
        if (challenges) {
          return Object.entries(groupBy(challenges, 'category'));
        } else {
          return null;
        }
      }
    );

export const selectChallengeById = (id: string) =>
  createSelector(
    selectAllChallenges,
    (allChallenges: Challenge[]) => {
      if (allChallenges) {
        return allChallenges.find(p => p.id === id);
      } else {
        return null;
      }
    }
  );

export const selectAllForeverChallenges = createSelector(
  selectAllChallenges,
  (allChallenges: Challenge[]) => {
    if (allChallenges) {
      return allChallenges.filter(challenge => !challenge.day);
    } else {
      return [];
    }
  }
);

export const selectNbForeverChallenges = createSelector(
  selectAllForeverChallenges,
  (foreverChallenges: Challenge[]) => foreverChallenges.length
);

export const selectChallengesError = createSelector(
  selectChallengesState,
  getError
);

export const selectChallengesSize: (object) => number = 
  challengesAdapter.getSelectors(selectChallengesState).selectTotal;

export const selectChallengesHasAny: MemoizedSelector<
  object,
  boolean
> = createSelector(
  challengesAdapter.getSelectors(selectChallengesState).selectTotal,
  (totalChallenges: number) => totalChallenges > 0
);

export const selectChallengesAreLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectChallengesState,
  getIsLoading
);
