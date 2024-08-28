import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inviti',
  templateUrl: './inviti.component.html',
  styleUrls: ['./inviti.component.scss'],
})
export class InvitiComponent {

  constructor(
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Inviti');
  }

  public email: string = '';

  public onChangeEmail($e: any) {
    this.email = $e.target.value;
  }

  public inviaEmail(email: string) {
  }
}
