import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
})
export class NavbarTopComponent implements OnInit {

  @Input()
  public titolo: string;

  @Input()
  public user: string;

  public showHamburgerMenu = false;

  constructor() {}

  ngOnInit(): void {}

  public setShowHamburgerMenu() {}
  public onClickGoToHome() {}
}
