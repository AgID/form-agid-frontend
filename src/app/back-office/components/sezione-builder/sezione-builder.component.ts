import { Component, Input, OnInit } from '@angular/core';
import { Formio, FormioOptions } from '@formio/angular';
import uswds from '@formio/uswds';
import { AGID_THEME } from 'src/app/common/formiojs/agid-theme';
// Get the HTMLComponent from the components listing.

@Component({
  selector: 'app-sezione-builder',
  templateUrl: './sezione-builder.component.html',
  styleUrls: ['./sezione-builder.component.scss'],
})
export class SezioneBuilderComponent implements OnInit {
  public formOptions: FormioOptions = {};

  @Input()
  public form: any = {};

  constructor() {}

  ngOnInit(): void {
    const { templates, framework, components } = uswds;
    Formio.use({
      templates,
      framework,
    });
    Formio.use(AGID_THEME);
  }

  onChange(event?: any) {
    this.form = { ...this.form };
  }
}
