import { Day } from './day';
import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
 
import { AuthenticationService } from './authentication.service';

@Injectable()
export class DayService {
  days$ = new BehaviorSubject(null);
  constructor(
    authenticationService: AuthenticationService,
    private db: AngularFirestore,
  ) {
    authenticationService.authenticatedUser$.pipe(
      filter(user => !!user))
      .subscribe(user => {
        this.retrieveDays(user);
      });
  }

  retrieveDays(fUser: User) {
    const daysRef = this.db
      .collection('days')
      .ref.get()
      .then(_days => {
        const days = _days.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Day[];
        this.days$.next(
          days,
          // days.filter(day => new Date(day.id).getTime() < Date.now()),
        );
      });
  }
}
