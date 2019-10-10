import { ChallengesService } from './../challenges.service';
import { FulfilledChallengesService } from './../fulfilled-challenges.service';
import { Component, OnInit } from '@angular/core';
import { Day } from '../day';
import { Router, ActivatedRoute } from '@angular/router';
import { Challenge } from '../challenge';
import { FulFilledChallenge } from '../fulfilled-challenge';
import { filter } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from '../root-store';
import { DaysStoreSelectors } from '../root-store/days-store';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  days$: Observable<Day[]>;
  uuid: string;
  foreverChallenges: Challenge[] = [];
  fulfilledForeverChallenges: FulFilledChallenge[] = [];
  foreverChallengesSubscription: Subscription;
  fulfilledForeverChallengesSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private challengesService: ChallengesService,
    private fulfilledChallengesService: FulfilledChallengesService,
    private store$: Store<RootStoreState.State>,
  ) {}

  ngOnInit() {
    this.days$ = this.store$.select(
      DaysStoreSelectors.selectAllDays
    );
    this.route.paramMap.subscribe(map => (this.uuid = map.get('uuid')));
    this.foreverChallengesSubscription = this.challengesService.foreverChallenges$.pipe(
      filter(challenges => !!challenges))
      .subscribe(challenges => {
        this.foreverChallenges = challenges;
      });
    this.fulfilledForeverChallengesSubscription = this.fulfilledChallengesService.fulfilledChallenges$.pipe(
      filter(challenges => !!challenges))
      .subscribe(ffcs => {
        this.fulfilledForeverChallenges = ffcs.filter(ffc => !ffc.day);
      });
  }
  goToPermanentChallenges() {
    this.router.navigate(['/', this.uuid, 'permanentChallenges'], {
      relativeTo: this.route,
    });
  }
}
