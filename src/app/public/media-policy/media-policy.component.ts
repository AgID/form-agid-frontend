import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-media-policy',
  templateUrl: './media-policy.component.html',
  styleUrls: ['./media-policy.component.css'],
})
export class MediaPolicyComponent {
  constructor(
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Media policy');
  }
}
