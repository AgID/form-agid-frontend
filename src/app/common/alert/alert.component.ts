import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input()
  public messaggio: string;

  @Input()
  public type: string;

  @Input()
  public htmlString: string;
}
