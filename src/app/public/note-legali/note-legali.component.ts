import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-note-legali',
  templateUrl: './note-legali.component.html',
  styleUrls: ['./note-legali.component.css'],
})
export class NoteLegaliComponent {
  constructor(
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('AGID Form | Note legali');
  }
}
