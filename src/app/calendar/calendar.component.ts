import { Component, OnInit } from "@angular/core";
import { Day } from "../day";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { RootStoreState } from "../root-store";
import { DaysStoreSelectors } from "../root-store/days-store";
import { ChallengesStoreSelectors } from "../root-store/challenges-store";
import { selectNbFulfilledForeverChallenges } from '../root-store/fulfilled-challenges-store/selectors';
import { selectAreForeverChallengesAccomplished } from '../root-store/selectors';

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
})
export class CalendarComponent implements OnInit {
  days$: Observable<Day[]>;
  uuid: string;
  foreverChallengesSize$: Observable<number>;
  fulfilledForeverChallengesSize$: Observable<number>;
  areForeverChallengesAllCompleted$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.days$ = this.store$.select(DaysStoreSelectors.selectAllDays);
    this.foreverChallengesSize$ = this.store$.select(
      ChallengesStoreSelectors.selectNbForeverChallenges
    );
    this.fulfilledForeverChallengesSize$ = this.store$.select(
      selectNbFulfilledForeverChallenges
    );
    this.areForeverChallengesAllCompleted$ = this.store$.select(
      selectAreForeverChallengesAccomplished
    );
  }
  goToPermanentChallenges() {
    //this.store$.dispatch()
    this.router.navigate(["/", this.uuid, "permanentChallenges"], {
      relativeTo: this.route
    });
  }
}
