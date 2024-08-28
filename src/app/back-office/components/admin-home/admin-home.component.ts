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

  private findPolicyWithEntityNull(userPolicyArray: any[]) {
    return userPolicyArray ? userPolicyArray.find(userPolicy => userPolicy?.entity === null)?.policy : null;
  }

  public anonymousUser() {    
    const policy = this.findPolicyWithEntityNull(this.authService.userInfo.user_policy);
    return policy && policy.entity?.length === 0;
  }

  public checkPendingRTD() {
    const policy = this.findPolicyWithEntityNull(this.authService.userInfo.user_policy);
    return policy && policy.entity?.some(
      (entity: { status: string; }) => entity.status === 'PENDING' || entity.status === 'Pending'
    );
  }

  public viewFrontOffice(): boolean {
    console.log("auth", this.authService.userInfo);

    const policy = this.findPolicyWithEntityNull(this.authService.userInfo?.user_policy);
    return policy && policy.entity?.some(
      (entity: { role: string; status: string; }) => entity.role === 'RTD' && entity.status === 'Active'
    );
  }

  public viewSuperAdminPages(): boolean {
    const policy = this.findPolicyWithEntityNull(this.authService.userInfo.user_policy);
    return policy && policy.entity?.some(
      (entity: { role: string; }) => entity.role === 'SUPER_ADMIN'
    );
  }



  routerNavigate(path: string) {
    this.router.navigate([`/`.concat(path)], {
      relativeTo: this.route,
    });
  }
}
