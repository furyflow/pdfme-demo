import type { Template } from '@pdfme/common';
import type { TemplateDefinition } from '../../types';

export const blankTemplate: Template = {
  basePdf: {
    width: 210, // A4 Portrait
    height: 297,
    padding: [15, 15, 15, 15],
  },
  schemas: [
    [
      {
        name: 'headerTitle',
        type: 'text',
        position: { x: 20, y: 25 },
        width: 170,
        height: 14,
        fontSize: 22,
        fontColor: '#0f172a',
        alignment: 'left',
      },
      {
        name: 'bodyParagraph',
        type: 'text',
        position: { x: 20, y: 45 },
        width: 170,
        height: 35,
        fontSize: 11,
        fontColor: '#334155',
        lineHeight: 1.5,
      },
      {
        name: 'sampleQr',
        type: 'qrcode',
        position: { x: 20, y: 90 },
        width: 35,
        height: 35,
      },
    ],
  ],
};

export const blankDefinition: TemplateDefinition = {
  id: 'blank',
  name: 'Blank Canvas (Starter)',
  description: 'Standard A4 canvas with initial text and QR placeholders ready for custom schema layout in Designer.',
  category: 'Custom',
  template: blankTemplate,
  sampleInputs: [
    {
      headerTitle: 'Welcome to your custom PDF document',
      bodyParagraph: 'You can design anything using pdfme: drag text boxes, insert vector graphics or photos, add barcodes, style dynamic multi-column tables, and bind interactive form fields.',
      sampleQr: 'https://github.com/pdfme/pdfme',
    },
  ],
};
