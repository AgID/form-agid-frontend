import UnknownEditDisplay from './editForm/Unknown.edit.display';

export default function () {
  return {
    components: [
      {
        type: 'tabs',
        key: 'tabs2',
        components: [
          {
            label: 'Custom',
            key: 'display2',
            weight: 0,
            components: UnknownEditDisplay,
          },
        ],
      },
    ],
  };
}
