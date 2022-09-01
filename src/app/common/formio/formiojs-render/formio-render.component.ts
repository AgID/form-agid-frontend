import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import uswds from '@formio/uswds';
import { Formio } from 'formiojs';
import { AGID_THEME } from '../agid-theme';

@Component({
  selector: 'app-formio-render',
  templateUrl: './formio-render.component.html',
  styleUrls: ['./formio-render.component.scss'],
})
export class FormioRenderComponent implements OnInit {
  ngOnInit() {
    const { templates, framework, components } = uswds;
    // Formio.use({
    //   templates,
    //   framework,
    // });
    Formio.use(AGID_THEME);
  }

  @Input()
  public form: any = {};

  @Input()
  public submission = {};

  @Input()
  public renderOptions: any = {};

  @Output()
  public changeFormio: EventEmitter<number> = new EventEmitter();

  public onChangeFormioEv(data: any) {
    this.changeFormio.emit(data);
  }
}
