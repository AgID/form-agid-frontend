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
    const usersAllowed: Array<UserRole> = route.data['usersAllowed'];
    const loggedUserInfo = this.authService.userInfo;
    if (usersAllowed && loggedUserInfo && loggedUserInfo.user_policy?.length) {
      const found = usersAllowed.find(
        (element: any) =>
          element.role === loggedUserInfo.user_policy[0].policy?.role &&
          element.status === loggedUserInfo.user_policy[0].policy?.status
      );
      return !!found;
      // return (
      //   // loggedUserInfo?.sub.slice(0, loggedUserInfo.sub.indexOf(':')) ===
      //   // 'Microsoft'
      //   loggedUserInfo?.user_policy[3].policy.role === 'SUPER_ADMIN'
      // );
      /* user_policy.some((el) => el.policy.is_admin) */
    }
    return !!loggedUserInfo;
  }
}
