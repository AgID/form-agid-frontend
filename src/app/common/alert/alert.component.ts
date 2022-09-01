import { Component, Input } from '@angular/core';
import { IAlertMessageType } from './types/message.type';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input()
  public messaggio: Array<IAlertMessageType>;

  @Input()
  public type: string;
}
