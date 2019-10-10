import { DayService } from './../day.service';
import { FulFilledChallenge } from './../fulfilled-challenge';
import { Challenge } from './../challenge';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Day } from '../day';
import { ChallengesService } from '../challenges.service';
import { FulfilledChallengesService } from '../fulfilled-challenges.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppStatusService } from '../app-status.service';
import { Subscription, Observable } from 'rxjs';
import { groupBy } from 'lodash';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootStoreState } from '../root-store';
import { DaysStoreSelectors } from '../root-store/days-store';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit, OnDestroy {
  challenges: Challenge[] = [];
  challengesByCategory: any[][] = [];
  allChallenges: Challenge[] = [];
  fulfilledChallenges: FulFilledChallenge[] = [];
  allFulfilledChallenges: FulFilledChallenge[] = [];
  dayId: string;
  day: Day;
  days$: Observable<Day[]>;
  paramsSubscription: Subscription;
  daySubscription: Subscription;
  ffcsSubscription: Subscription;
  challengesSubscription: Subscription;
  userUuid: string;
  constructor(
    private challengesService: ChallengesService,
    private fulfilledChallengeService: FulfilledChallengesService,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<RootStoreState.State>,
  ) {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.dayId = params.day;
      this.userUuid = params.uuid;
    });
  }

  ngOnInit() {
    this.days$ = this.store$.select(
      DaysStoreSelectors .selectAllDays
    );
    this.challengesSubscription = this.challengesService.allChallenges$
      .pipe(filter(challenges => !!challenges))
      .subscribe(challenges => {
        this.allChallenges = challenges;
        this.updateCurrentChallenges();
      });
    this.ffcsSubscription = this.fulfilledChallengeService.fulfilledChallenges$
      .pipe(filter(challenges => !!challenges))
      .subscribe(ffChallenges => {
        this.allFulfilledChallenges = ffChallenges;
        this.updateFFChallenges();
      });
  }

  updateCurrentChallenges() {
    this.challenges = this.allChallenges.filter(
      challenge => challenge.day === this.dayId,
    );
    this.challengesByCategory = Object.entries(groupBy(this.challenges, 'category'));
  }

  updateFFChallenges() {
    this.fulfilledChallenges = this.allFulfilledChallenges
      .filter(ffc => ffc.day === this.dayId)
      .filter(ffc => ffc.answers && ffc.answers.length);
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.ffcsSubscription.unsubscribe();
    this.daySubscription.unsubscribe();
    this.challengesSubscription.unsubscribe();
  }
  fulfilledChallengesPercentage() {
    return this.fulfilledChallenges && this.challenges
      ? this.fulfilledChallenges.length * 100 / this.challenges.length
      : 0;
  }
  goToChallenge(challenge: Challenge) {
    this.router.navigate([this.userUuid, 'challenge', challenge.id]);
  }
  updateSelectedDay(selectedDay) {
    this.router.navigate([this.userUuid, 'calendar', selectedDay.value]);
    this.updateFFChallenges();
    this.updateCurrentChallenges();
  }
}
