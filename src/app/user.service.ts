import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { User as LondonChallengeUser, AccountType, User } from './user';

@Injectable()
export class UserService {
  users$ = new BehaviorSubject<LondonChallengeUser[]>(null);
  currentUser$ = new BehaviorSubject<LondonChallengeUser>(null);
  authenticatedUser: LondonChallengeUser;
  currentUser: LondonChallengeUser;
  constructor(
    authenticationService: AuthenticationService,
    private db: AngularFirestore,
  ) {
    authenticationService.authenticatedUser$.pipe(
      filter(user => !!user))
      .subscribe(user => {
        this.getUsers();
        this.retrieveUserRights(user.email).then(u => {
          this.authenticatedUser = u;
          this.setCurrentUser(u);
        });
      });
  }
  setCurrentUser(user: LondonChallengeUser) {
    this.currentUser = user;
    this.currentUser$.next(user);
  }

  public isCurrentUserAuthorized(uuid: string): boolean {
    return (
      this.currentUser &&
      (this.currentUser.uuid === uuid ||
        this.currentUser.accountType === AccountType.admin)
    );
  }

  retrieveUserRights(email: string): Promise<LondonChallengeUser> {
    const userRef = this.db.collection('users').doc(email).ref;
    return userRef
      .get()
      .then(
        userContent => ({ id: userContent.id, ...userContent.data() } as any),
      );
  }

  getUsers(): Promise<User[]> {
    const usersRef = this.db.collection('users').ref;
    return usersRef
      .get()
      .then(users =>
          users.docs.map(user => ({ id: user.id, ...user.data() } as any)), 
      );
  }
}
