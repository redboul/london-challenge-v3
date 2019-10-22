import { Input, Component, OnInit } from "@angular/core";
import { Challenge, challengeType } from "../challenge";
import { Observable } from "rxjs";
import { RootStoreState } from "../root-store";
import { Store } from "@ngrx/store";
import { selectIsChallengeFulfilledByChallengeId } from '../root-store/fulfilled-challenges-store/selectors';

@Component({
  selector: "app-challenge",
  templateUrl: "./challenge.component.html",
  styleUrls: ["./challenge.component.css"]
})
export class ChallengeComponent implements OnInit {
  @Input() challenge: Challenge;
  isChallengeFulfilled$: Observable<boolean>;
  answerToSubmit: string;
  constructor(private store$: Store<RootStoreState.State>) {}

  ngOnInit() {
    this.isChallengeFulfilled$ = this.store$.select(
      selectIsChallengeFulfilledByChallengeId(this.challenge.id)
    );
  }
  isTextChallenge() {
    return this.challenge.type === challengeType.text;
  }
  isMediaChallenge() {
    return this.challenge.type === challengeType.media;
  }
}
