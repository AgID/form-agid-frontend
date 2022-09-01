import { Components } from 'formiojs';
import editForm from './Unknown.form';
const UnknownElement = Components.components.unknown;
export default class UnknownComponent extends UnknownElement {
  [x: string]: any;
  static override editForm = editForm;
  static override schema() {
    return {
      type: 'custom2',
      key: 'custom2',
      protected: false,
      persistent: true,
    };
  }

  static get builderInfo() {
    return {
      title: 'Custom2',
      icon: 'cubes',
      group: 'premium',
      documentation: '/userguide/forms/premium-components#custom',
      weight: 120,
      schema: UnknownComponent.schema(),
    };
  }

  getInputInfo() {
    const info = this['inputInfo'];
    switch (this.component.customComponents) {
      case 'address':
        console.log('address');
        break;
      case 'test':
        console.log('test');
        break;
    }
    console.log('this -> ', this);
    this.component.componentJson2 = JSON.stringify({ cc: 'aa' });
    return info;
  }

  override render() {
    return UnknownElement.prototype.render.call(
      this,
      this.renderTemplate('custom', {
        component: this.component,
        input: this.getInputInfo(),
      })
    );
  }
}
