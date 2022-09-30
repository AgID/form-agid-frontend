import { Components } from 'formiojs';

const DateTimeComponent = Components.components.datetime;
export default class AGIDDateTimeComponent extends DateTimeComponent {
  override renderElement(value: any, index: string | number) {
    if (this.options.renderMode === 'html') {
      return `<div ref="value">${super.getValueAsString(value)}</div>`;
    } else {
      return super.renderElement(value, index);
    }
  }
}
