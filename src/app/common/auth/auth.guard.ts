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
    const usersAllowed: Array<{ role: UserRole; status: string }> = route.data['usersAllowed'];
    const loggedUserInfo = this.authService.userInfo;
    if (usersAllowed && loggedUserInfo && loggedUserInfo.user_policy?.length) {
      const entities = loggedUserInfo.user_policy[0].policy.entity;
      console.log('Enti:', entities);
      
      const found = entities.find((policy: { role: UserRole; status: string; }) =>
        usersAllowed.some(allowed =>
          allowed.role === policy.role && allowed.status.toLowerCase() === policy.status.toLowerCase()
        )
      );
      console.log('Ente:', found);
      return !!found;
    }
    console.log('No enti');
    return !!loggedUserInfo;
  }
}
