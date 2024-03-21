import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.canActivateProtectedRoutes$.subscribe((ev) => {
      if (this.authService.userInfo.user_policy?.length) {
        if (this.anonymousUser()) {
          this.routerNavigate('identifica-amministrazione');
          // this.routerNavigate('scelta-utente');
        } else if (this.checkPendingRTD()) {
          this.routerNavigate('identifica-amministrazione');
        } else if (!this.viewSuperAdminPages()) {
          this.routerNavigate('elenco-form');
        }
      }
    });
  }

  public anonymousUser() {
    return (
      this.authService.userInfo &&
      this.authService.userInfo.user_policy?.length &&
      Object.keys(this.authService.userInfo.user_policy[0].policy).length === 0
    );
  }

  public checkPendingRTD() {
    return (
      this.authService.userInfo &&
      this.authService.userInfo.user_policy?.length &&
      Object.keys(this.authService.userInfo.user_policy[0].policy).length ===
      0 &&
      this.authService.userInfo.user_policy?.[0]?.policy?.status === 'PENDING'
    );
  }

  public viewFrontOffice(): boolean {
    if (this.authService.userInfo &&
      this.authService.userInfo.user_policy?.length &&
      (this.authService.userInfo.user_policy[0].policy.role === 'RTD' && this.authService.userInfo.user_policy[0].policy.status === 'Active')) {
      return true
    } else {
      this.routerNavigate('identifica-amministrazione');
    }
  }

  public viewSuperAdminPages(): boolean {
    return (
      this.authService.userInfo &&
      this.authService.userInfo.user_policy?.length &&
      this.authService.userInfo.user_policy[0].policy.role === 'SUPER_ADMIN'
    );
  }

  routerNavigate(path: string) {
    this.router.navigate([`/`.concat(path)], {
      relativeTo: this.route,
    });
  }
}
