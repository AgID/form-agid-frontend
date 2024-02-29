import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
})
export class PrivacyPolicyComponent{
  constructor(
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Privacy policy');
  }
}
