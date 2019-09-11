import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { QuerySnapshot } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { AppStatusService } from './app-status.service';
import { Challenge } from './challenge';
import { filter } from 'rxjs/operators';

@Injectable()
export class ChallengesService {
  private challenges: QuerySnapshot<Challenge>;
  public foreverChallenges$ = new BehaviorSubject<Challenge[]>(undefined);
  public allChallenges$ = new BehaviorSubject<Challenge[]>(undefined);
  public allChallenges: Challenge[] = [];
  constructor(
    authenticationService: AuthenticationService,
    private db: AngularFirestore,
    private appStatusService: AppStatusService,
  ) {
    authenticationService.authenticatedUser$.pipe(
      filter(user => !!user))
      .subscribe(() => {
        this.retrieveChallenges();
      });
  }

  retrieveChallenges() {
    this.appStatusService.workInProgress();
    this.db
      .collection<Challenge>('challenges')
      .ref.get()
      .then((challenges: QuerySnapshot<Challenge>) => {
        this.challenges = challenges;
        this.allChallenges = challenges.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Challenge[];
        this.allChallenges$.next(this.allChallenges);
        this.foreverChallenges$.next(
          this.allChallenges.filter(challenge => !challenge.day),
        );
        this.appStatusService.available();
      });
  }
  getChallengesCount() {
    return this.challenges.size;
  }
}
