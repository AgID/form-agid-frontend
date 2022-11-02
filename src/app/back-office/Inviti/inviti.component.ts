import { Component } from '@angular/core';

@Component({
  selector: 'app-inviti',
  templateUrl: './inviti.component.html',
  styleUrls: ['./inviti.component.scss'],
})
export class InvitiComponent {
  public email: string = '';

  public onChangeEmail($e: any) {
    this.email = $e.target.value;
  }

  public inviaEmail(email: string) {
    console.log(email);
  }
}
