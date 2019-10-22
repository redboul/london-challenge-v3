import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { fulfilledChallengesAdapter, State } from "./state";
import { FulfilledChallenge } from "../../fulfilled-challenge";

const getError = (state: State): any => state.error;

const getIsLoading = (state: State): boolean => state.isLoading;

export const selectFulfilledChallengesState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>("fulfilledChallenges");

export const selectFulfilledChallenges: (
  state: object
) => FulfilledChallenge[] = fulfilledChallengesAdapter.getSelectors(
  selectFulfilledChallengesState
).selectAll;

export const selectChallengesError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectFulfilledChallengesState,
  getError
);

export const selectFulfilledChallengesSize: (
  object
) => number = fulfilledChallengesAdapter.getSelectors(
  selectFulfilledChallengesState
).selectTotal;

export const selectFulfilledChallengesAreLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectFulfilledChallengesState,
  getIsLoading
);

export const selectAllFulfilledForeverChallenges = createSelector(
  selectFulfilledChallenges,
  (allChallenges: FulfilledChallenge[]) => {
    if (allChallenges) {
      return allChallenges.filter(challenge => !challenge.day);
    } else {
      return [];
    }
  }
);

export const selectNbFulfilledForeverChallenges = createSelector(
  selectFulfilledChallenges,
  (allChallenges: FulfilledChallenge[]) => allChallenges.length
);

export const selectFulfilledChallengesByChallengeId = (id: string) =>
  createSelector(
    selectFulfilledChallenges,
    (allChallenges: FulfilledChallenge[]) =>
      allChallenges.find(challenge => challenge.id === id)
  );

export const selectIsChallengeFulfilledByChallengeId = (id: string) =>
  createSelector(
    selectFulfilledChallengesByChallengeId(id),
    (challenge: FulfilledChallenge) => !!challenge
  );
