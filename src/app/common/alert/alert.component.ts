import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input()
  public messaggio: Array<{
    label: '';
    routerlink: false;
    link: '';
    params: {};
  }>;

  @Input()
  public type: string;
}
