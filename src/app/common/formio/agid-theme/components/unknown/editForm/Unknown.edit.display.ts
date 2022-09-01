export default [
  {
    type: 'select',
    key: 'customComponents',
    overrideEditForm: true,
    label: 'Componenti',
    input: true,
    tooltip: 'Scegli il componente di default',
    dataSrc: 'values',
    weight: 140,
    data: {
      values: [
        { label: 'Indirizzo', value: 'address' },
        { label: 'Test', value: 'test' },
      ],
    },
  },
  {
    type: 'textarea',
    editor: 'ace',
    weight: 10,
    input: true,
    key: 'componentJson2',
    label: 'Custom Element JSON',
    tooltip: 'Enter the sdfsdfsdffsdJSON for this custom element.',
  },
];
