import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import uswds from '@formio/uswds';
import { Formio } from 'formiojs';
import { AGID_THEME } from '../agid-theme';

@Component({
  selector: 'app-formio-builder',
  templateUrl: './formio-builder.component.html',
  styleUrls: ['./formio-builder.component.scss'],
})
export class FormioBuilderComponent implements OnInit {
  @Input()
  public form: any = {};

  @Input()
  public options: any = {};

  @Output()
  public changeFormio: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    // const { templates, framework, components } = uswds;
    // Formio.use({
    //   templates,
    //   framework,
    // });
    Formio.use(AGID_THEME);
  }

  public onChangeFormioEv(data: any) {
    this.changeFormio.emit(data);
  }
}
