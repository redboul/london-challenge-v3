import { createSelector, MemoizedSelector } from "@ngrx/store";
import { UsersStoreSelectors } from "./users-store";
import { UserStoreSelectors } from "./user-store";
import { DaysStoreSelectors } from "./days-store";
import { ChallengesStoreSelectors } from "./challenges-store";
import {
  selectFulfilledChallenges,
  selectFulfilledChallengesSize
} from "./fulfilled-challenges-store/selectors";
import { FulfilledChallenge } from "../fulfilled-challenge";
import { selectCurrentDayId } from "./days-store/selectors";
import {
  selectChallengesSize,
  selectAllChallenges
} from "./challenges-store/selectors";
import { FulfilledChallengesStoreSelectors } from "./fulfilled-challenges-store";
import { Challenge } from "../challenge";
import { selectNbFulfilledForeverChallenges } from './fulfilled-challenges-store/selectors';
import { selectNbForeverChallenges } from './challenges-store/selectors';

export const selectAppIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  UsersStoreSelectors.selectUsersAreLoading,
  UserStoreSelectors.selectUserIsLoading,
  DaysStoreSelectors.selectDaysAreLoading,
  ChallengesStoreSelectors.selectChallengesAreLoading,
  FulfilledChallengesStoreSelectors.selectFulfilledChallengesAreLoading,
  (
    usersAreLoading: boolean,
    userIsLoading: boolean,
    daysAreLoading: boolean,
    challengesAreLoading: boolean,
    fulfilledChallengesAreLoading: boolean
  ) => {
    return (
      usersAreLoading ||
      userIsLoading ||
      daysAreLoading ||
      challengesAreLoading ||
      fulfilledChallengesAreLoading
    );
  }
);

export const selectChallengeByDayId = createSelector(
  selectAllChallenges,
  selectCurrentDayId,
  (allChallenges: Challenge[], currentDayId: string) => {
    if (allChallenges) {
      return allChallenges.filter(p => p.day === currentDayId);
    } else {
      return [] as Challenge[];
    }
  }
);

export const selectNbChallengeByDayId = createSelector(
  selectChallengeByDayId,
  (allChallenges: Challenge[]) => allChallenges.length
);

export const selectFulfilledChallengeByDayId = createSelector(
  selectFulfilledChallenges,
  selectCurrentDayId,
  (fulfilledChallenge: FulfilledChallenge[], currentDayId: string) => {
    if (fulfilledChallenge) {
      return fulfilledChallenge
        .filter(ffc => ffc.day === currentDayId)
        .filter(ffc => ffc.answers && ffc.answers.length);
    } else {
      return [];
    }
  }
);

export const selectNbFulfilledChallengeByDayId = createSelector(
  selectFulfilledChallengeByDayId,
  (allChallenges: FulfilledChallenge[]) => allChallenges.length
);

export const selectFulfilledChallengesPercentage = createSelector(
  selectFulfilledChallengesSize,
  selectChallengesSize,
  (fulfilledForeverChallengesSize: number, challengesSize: number) =>
    (fulfilledForeverChallengesSize * 100) / challengesSize
);

export const selectFulfilledChallengesPercentageByDayId = 
createSelector(
  selectNbFulfilledChallengeByDayId,
  selectNbChallengeByDayId,
  (nbFulfilledChallengeByDayId: number, nbChallengeByDayId: number) =>
    (nbFulfilledChallengeByDayId * 100) / nbChallengeByDayId
);

export const selectIsDaysChallengesAccomplished = createSelector(
  selectNbFulfilledChallengeByDayId,
  selectNbChallengeByDayId,
  (fulfilledChallengesSize: number, challengesSize: number) =>
  fulfilledChallengesSize === challengesSize
);

export const selectAreForeverChallengesAccomplished = createSelector(
  selectNbFulfilledForeverChallenges,
  selectNbForeverChallenges,
  (fulfilledChallengesSize: number, challengesSize: number) =>
  fulfilledChallengesSize === challengesSize
);
