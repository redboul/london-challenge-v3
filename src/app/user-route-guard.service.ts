import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
@Injectable()
export class UserGuard implements CanActivateChild {
  constructor(private userService: UserService) {}
  canActivateChild(
    route: ActivatedRouteSnapshot
  ): boolean {
    return this.userService.isCurrentUserAuthorized(route.params.uuid);
  }
}
