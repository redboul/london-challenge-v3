import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Challenge } from "../challenge";
import { FulfilledChallenge } from "../fulfilled-challenge";
import { RootStoreState } from "../root-store";
import { Store } from "@ngrx/store";
import { ChallengesStoreSelectors } from "../root-store/challenges-store";
import { FulfilledChallengesStoreSelectors } from "../root-store/fulfilled-challenges-store";
import { selectFulfilledChallengesPercentageByDayId } from "../root-store/selectors";

@Component({
  selector: "app-forever-challenges",
  templateUrl: "./forever-challenges.component.html",
  styleUrls: ["./forever-challenges.component.css"]
})
export class ForeverChallengesComponent implements OnInit {
  challenges$: Observable<Challenge[]>;
  challengesByCategory$: Observable<any[][]>;
  fulfilledForeverChallenges$: Observable<FulfilledChallenge[]>;
  fulfilledForeverChallengesPercentage$: Observable<number>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.challenges$ = this.store$.select(
      ChallengesStoreSelectors.selectAllChallenges
    );
    this.challengesByCategory$ = this.store$.select(
      ChallengesStoreSelectors.selectChallengeGroupedByCategory
    );
    this.fulfilledForeverChallenges$ = this.store$.select(
      FulfilledChallengesStoreSelectors.selectFulfilledChallenges
    );
    this.fulfilledForeverChallengesPercentage$ = this.store$.select(
      selectFulfilledChallengesPercentageByDayId
    );
  }

  goToChallenge(challenge: Challenge) {
    this.router.navigate(["..", "challenge", challenge.id], {
      relativeTo: this.route
    });
  }
}
