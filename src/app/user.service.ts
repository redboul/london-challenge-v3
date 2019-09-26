import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AccountType, User } from './user';

@Injectable()
export class UserService {
  users$ = new BehaviorSubject<User[]>(null);
  currentUser$ = new BehaviorSubject<User>(null);
  authenticatedUser: User;
  currentUser: User;
  constructor(private db: AngularFirestore) {}

  setCurrentUser(user: User) {
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

  getUserRight(email: string): Promise<User> {
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
