import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { RootStoreState } from './root-store';
import { Observable } from 'rxjs';
import { UserStoreSelectors } from './root-store/user-store';
@Injectable()
export class UserGuard implements CanActivateChild {
  constructor(private store$: Store<RootStoreState.State>) {}
  canActivateChild(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> {
    return this.store$.select(UserStoreSelectors.selectIsAuthenticatedUserAuthorizedToAccessTeam);
  }
}
