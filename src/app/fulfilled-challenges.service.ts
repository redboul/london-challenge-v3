import { Injectable } from "@angular/core";

import {
  AngularFirestore
} from "@angular/fire/firestore";

import { QuerySnapshot } from "@angular/fire/firestore";
import { FulfilledChallenge } from './fulfilled-challenge';

@Injectable()
export class FulfilledChallengesService {
  constructor(private db: AngularFirestore) {}

  retrieveFulfilledChallenges(userEmail: string) {
    return this.db
      .collection(`users/${userEmail}/fulfilledChallenges`)
      .ref.get()
      .then((fulfilledChallenges: QuerySnapshot<FulfilledChallenge>) =>
        fulfilledChallenges.docs
          .map(
            doc =>
              ({
                id: doc.id,
                ...doc.data()
              } as FulfilledChallenge)
          )
          .filter(_ffcs => _ffcs && _ffcs.answers && _ffcs.answers.length)
      );
  }

  submitFulfillChallenge(
    userEmail: string,
    fulfillChallenge: FulfilledChallenge
  ): Promise<void> {
    return this.db
      .collection(`users/${userEmail}/fulfilledChallenges`)
      .doc(fulfillChallenge.id)
      .set(
        {
          type: fulfillChallenge.type,
          day: fulfillChallenge.day,
          answers: fulfillChallenge.answers
        },
        { merge: true }
      );
  }
}