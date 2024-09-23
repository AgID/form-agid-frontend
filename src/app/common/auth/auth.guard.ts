import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserRole } from './role.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const usersAllowed: Array<{ role: UserRole; status: string; firstAccess?: boolean }> = route.data['usersAllowed'];
    const loggedUserInfo = this.authService.userInfo;
    if (loggedUserInfo && loggedUserInfo.user_policy?.length) {
      const nullEntityPolicy = loggedUserInfo.user_policy.find(userPolicy => userPolicy.entity === null);

      if (nullEntityPolicy) {
        const entities = nullEntityPolicy.policy.entity;

        if (entities?.length === 0) {
          const firstAccessAllowed = usersAllowed.some(allowed => allowed.firstAccess === true);
          return firstAccessAllowed;
        }
        if (entities) {
          const found = entities.find((policy: { role: UserRole; status: string }) =>
            usersAllowed.some(allowed =>
              allowed.role === policy.role && allowed.status.toLowerCase() === policy.status.toLowerCase()
            )
          );
          return !!found;
        }

      }
    }
    return !!loggedUserInfo;
  }
}
