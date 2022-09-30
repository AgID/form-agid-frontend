import { Components } from 'formiojs';

const CheckboxComponent = Components.components.checkbox;
export default class AGIDCheckboxComponent extends CheckboxComponent {
  override render(element: any) {
    if (this.options.renderMode === 'html') {
      let c = super.render(element);
      c = c.replace('True', 'Si');
      c = c.replace('False', 'No');
      return c;
    } else {
      return super.render(element);
    }
  }
}
