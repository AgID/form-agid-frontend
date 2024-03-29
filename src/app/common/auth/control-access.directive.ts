import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRole } from './role.enum';

@Directive({ selector: '[appControlAccess]' })
export class ControlAccessDirective implements OnInit {
  @Input() role: UserRole;

  constructor(private authService: AuthService, private elemRef: ElementRef) {}

  ngOnInit() {
    const userInfo = this.authService.userInfo;
    const isLoggedIn = !!userInfo;
    if (!isLoggedIn) {
      this.elemRef.nativeElement.remove();
    }

    const isAdmin =
      userInfo?.sub.slice(0, userInfo.sub.indexOf(':')) === 'Microsoft';
    // user_policy?.some((elem) => elem.policy.is_admin)
    if (this.role && !isAdmin) {
      this.elemRef.nativeElement.remove();
    }
  }
}
