import { Challenge } from "./../challenge";
import { Component, OnInit } from "@angular/core";
import { Day } from "../day";

import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { RootStoreState } from "../root-store";
import { DaysStoreSelectors } from "../root-store/days-store";
import { ChallengesStoreSelectors } from "../root-store/challenges-store";
import { FulfilledChallenge } from "../fulfilled-challenge";
import { FulfilledChallengesStoreSelectors } from "../root-store/fulfilled-challenges-store";
import {
  selectChallengeByDayId,
  selectFulfilledChallengeByDayId,
  selectFulfilledChallengesPercentageByDayId
} from "../root-store/selectors";

@Component({
  selector: "app-day",
  templateUrl: "./day.component.html",
  styleUrls: ["./day.component.css"]
})
export class DayComponent implements OnInit {
  challenges$: Observable<Challenge[]>;
  challengesByCategory$: Observable<[string, Challenge[]][]>;
  fulfilledChallenges$: Observable<FulfilledChallenge[]>;
  allFulfilledChallenges$: Observable<FulfilledChallenge[]>;
  fulfilledChallengesPercentage$: Observable<number>;
  dayId$: Observable<string>;
  day$: Observable<Day>;
  days$: Observable<Day[]>;
  constructor(
    private router: Router,
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.days$ = this.store$.select(DaysStoreSelectors.selectAllDays);
    this.day$ = this.store$.select(DaysStoreSelectors.selectCurrentDay);
    this.dayId$ = this.store$.select(DaysStoreSelectors.selectCurrentDayId);
    this.challenges$ = this.store$.select(selectChallengeByDayId);
    this.challengesByCategory$ = this.store$.select(
      ChallengesStoreSelectors.selectChallengeGroupedByCategory
    );
    this.allFulfilledChallenges$ = this.store$.select(
      FulfilledChallengesStoreSelectors.selectFulfilledChallenges
    );
    this.fulfilledChallenges$ = this.store$.select(
      selectFulfilledChallengeByDayId
    );
    this.fulfilledChallengesPercentage$ = this.store$.select(
      selectFulfilledChallengesPercentageByDayId
    );
  }

  goToChallenge(challenge: Challenge) {
    // TODO
    // this.router.navigate([this.userUuid, "challenge", challenge.id]);
  }
  updateSelectedDay(selectedDay) {
    // TODO
    // this.router.navigate([this.userUuid, "calendar", selectedDay.value]);
  }
}
