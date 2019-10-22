import { UserService } from './../user.service';
import { User, AccountType } from './../user';
import { FulfilledChallengesService } from './../fulfilled-challenges.service';
import { ChallengesService } from './../challenges.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from '../root-store';
import { UserStoreActions } from '../root-store/user-store';
import { selectNbFulfilledChallengeByDayId, selectFulfilledChallengesPercentage } from '../root-store/selectors';
import { ChallengesStoreSelectors } from '../root-store/challenges-store';

@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.css'],
})
export class TeamStatusComponent implements OnInit {
  @Input() teamUser: User;
  fulfilledChallengesSize$: Observable<number>;
  challengesSize$: Observable<number>;
  progressPercentage$: Observable<number>;
  constructor(
    private store$: Store<RootStoreState.State>,
  ) {}

  ngOnInit() {
    this.fulfilledChallengesSize$ = this.store$.select(selectNbFulfilledChallengeByDayId);
    this.challengesSize$ = this.store$.select(ChallengesStoreSelectors.selectChallengesSize);
    this.progressPercentage$ = this.store$.select(selectFulfilledChallengesPercentage);
  }

  setCurrentUser() {
    this.store$.dispatch(new UserStoreActions.SetCurrentTeamAction({ team: this.teamUser }));
  }
}
