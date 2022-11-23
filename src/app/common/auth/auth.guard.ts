import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';
import { UserRole } from './role.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const usersAllowed: UserRole = route.data['usersAllowed'];
    const loggedUserInfo = this.authService.userInfo;
    // TODO gestione dei ruoli basandoci sul valore di usersAllowed
    if (usersAllowed) {
      return (
        loggedUserInfo?.sub.slice(0, loggedUserInfo.sub.indexOf(':')) ===
        'Microsoft'
      );
      /* user_policy.some((el) => el.policy.is_admin) */
    }
    return !!loggedUserInfo;
  }
}
