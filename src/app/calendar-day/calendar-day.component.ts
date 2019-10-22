import { Component, OnInit, Input } from "@angular/core";
import { Day } from "../day";
import { Router, ActivatedRoute } from '@angular/router';
import { RootStoreState } from "../root-store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectNbFulfilledChallengeByDayId, selectNbChallengeByDayId, selectIsDaysChallengesAccomplished } from '../root-store/selectors';

@Component({
  selector: "app-calendar-day",
  templateUrl: "./calendar-day.component.html",
  styleUrls: ["./calendar-day.component.css"]
})
export class CalendarDayComponent implements OnInit {
  @Input() day: Day;
  challengesSize$: Observable<number>;
  fulfilledChallengesSize$: Observable<number>;
  isDayAccomplished$: Observable<boolean>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) {}

  ngOnInit() {
    this.challengesSize$ = this.store$.select(
      selectNbChallengeByDayId
    );
    this.fulfilledChallengesSize$ = this.store$.select(
      selectNbFulfilledChallengeByDayId
    );
    this.isDayAccomplished$ = this.store$.select(
      selectIsDaysChallengesAccomplished
    );
  }

  goToDay() {
    this.router.navigate([this.day.id], { relativeTo: this.route });
  }
}
