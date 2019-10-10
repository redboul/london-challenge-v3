import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Day } from './day';

@Injectable()
export class DayService {
  constructor(
    private db: AngularFirestore,
  ) {}

  getDays(): Promise<Day[]> {
    return this.db
      .collection('days')
      .ref.get()
      .then(_days => 
        _days.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Day[]);
  }
}
