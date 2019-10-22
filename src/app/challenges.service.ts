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
  constructor(
    private db: AngularFirestore,
  ) {
  }

  retrieveChallenges(): Promise<Challenge[]> {
    return this.db
      .collection<Challenge>('challenges')
      .ref.get()
      .then((challenges: QuerySnapshot<Challenge>) => {
        return challenges.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Challenge[];
      });
  }
}
