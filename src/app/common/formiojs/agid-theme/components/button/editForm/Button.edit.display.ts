export default [
  {
    type: 'select',
    key: 'theme',
    overrideEditForm: true,
    label: 'Theme',
    input: true,
    tooltip: 'The color theme of this button.',
    dataSrc: 'values',
    weight: 140,
    data: {
      values: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Outline', value: 'outline' },
        { label: 'Danger', value: 'danger' },
        { label: 'Info', value: 'info' },
      ],
    },
  },
];
