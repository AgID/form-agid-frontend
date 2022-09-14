import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormioOptions } from '@formio/angular';
import { SharedService } from '../../inserimento/shared.service';

@Component({
  selector: 'app-sezione-builder',
  templateUrl: './sezione-builder.component.html',
  styleUrls: ['./sezione-builder.component.scss'],
})
export class SezioneBuilderComponent implements OnChanges {
  @Output()
  public changeForm: EventEmitter<unknown> = new EventEmitter();

  public formOptions: any = { noDefaultSubmitButton: true };

  @Input()
  public form: any = {};

  @Input()
  public hasSottomissioni: boolean = false;

  constructor(private _sharedService: SharedService) {}

  public ngOnChanges(changes: any): void {
    if (changes.form && this.form?.components?.length > 0) {
      this.populateSharedServiceWithFormIdFields();
    }
  }

  onChange(event?: any) {
    this.form = { ...this.form };
    if (event.type === 'addComponent') {
      this.populateSharedServiceWithFormIdFields();
    } else if (event.type === 'deleteComponent') {
      this._sharedService.optionsCampoTarget.forEach(
        (element: any, index: number) => {
          if (element.option === event.component.key) {
            this._sharedService.optionsCampoTarget.splice(index, 1);
            return;
          }
        }
      );
    }
    this.changeForm.emit(this.form);
  }

  private populateSharedServiceWithFormIdFields() {
    this._sharedService.optionsCampoTarget.length = 0;
    this.form.components.forEach((element: any) => {
      if (element.type === 'url' || element.type === 'textfield')
        this._sharedService.optionsCampoTarget.push({
          option: element.key,
        });
    });

    // TODO: Da valutare i campi da poter inserire nel titolo tramite i segnaposti
    this._sharedService.optionsTitolo.length = 0;
    this.form.components.forEach((element: any) => {
      if (element.type === 'url' || element.type === 'textfield')
        this._sharedService.optionsTitolo.push({
          option: element.key,
        });
    });
  }

  public ExportForm() {
    if (this.form) {
      const a = document.createElement('a');
      const blob = new Blob([JSON.stringify(this.form, null, 2)], {
        type: 'application/json',
      });
      a.href = URL.createObjectURL(blob);
      a.download = 'form.json';
      a.click();
    }
  }

  public onChangeUpload(e: any) {
    this.form = {};
    const input = e.target;
    if ('files' in input && input.files.length > 0) {
      const reader = new FileReader();
      new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(input.files[0]);
      })
        .then((content: any) => {
          try {
            this.form = JSON.parse(content);
          } catch (error) {
            //gestione errore front end
            console.log(error);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  public placeFileContent(target: any, file: any) {
    this.readFileContent(file)
      .then((content) => {
        target.value = content;
      })
      .catch((error) => console.log(error));
  }

  public readFileContent(file: any) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }
}
