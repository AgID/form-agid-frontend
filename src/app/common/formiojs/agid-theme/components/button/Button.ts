import { Components } from 'formiojs';
import editForm from './Button.form';

const ButtonComponent = Components.components.button;
const FieldComponent = Components.components.field;

export default class AGIDButtonComponent extends ButtonComponent {
  static override editForm = editForm;
  [x: string]: any;
  getInputInfo() {
    const info = this['inputInfo'];
    info.attr.class = 'btn';
    switch (this.component.theme) {
      case 'primary':
        info.attr.class += ' btn-primary';
        break;
      case 'secondary':
        info.attr.class += ' btn-secondary';
        break;
      case 'info':
        info.attr.class += ' btn-info';
        break;
      case 'success':
        info.attr.class += ' btn-success';
        break;
      case 'danger':
        info.attr.class += ' btn-danger';
        break;
      case 'warning':
        info.attr.class += ' btn-warning';
        break;
      case 'base':
        info.attr.class += ' btn-base';
        break;
      case 'outline':
        info.attr.class += ' btn-outline-primary';
        break;
    }
    if (this.component.customClass) {
      info.attr.class += ` ${this.component.customClass}`;
    }
    return info;
  }

  override render() {
    if (this.viewOnly || this.options.hideButtons) {
      this['_visible'] = false;
    }
    return FieldComponent.prototype.render.call(
      this,
      this.renderTemplate('button', {
        component: this.component,
        input: this.getInputInfo(),
      })
    );
  }
}
