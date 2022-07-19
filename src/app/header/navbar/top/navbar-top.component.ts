import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
})
export class NavbarTopComponent {
  @Input()
  public titolo: string;

  @Input()
  public user: string;

  public showHamburgerMenu = false;

  public setShowHamburgerMenu() {}
  public onClickGoToHome() {}
}
