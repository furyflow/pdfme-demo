import type { Template } from '@pdfme/common';
import type { TemplateDefinition } from '../../types';

export const badgeTemplate: Template = {
  basePdf: {
    width: 105, // A6 Event Badge (105mm x 148mm)
    height: 148,
    padding: [8, 8, 8, 8],
  },
  schemas: [
    [
      // Top header banner
      {
        name: 'banner',
        type: 'rectangle',
        position: { x: 8, y: 8 },
        width: 89,
        height: 28,
        color: '#6366f1',
        borderColor: '#4f46e5',
        borderWidth: 0,
        readOnly: true,
      },
      // Event Name
      {
        name: 'eventName',
        type: 'text',
        position: { x: 12, y: 13 },
        width: 81,
        height: 8,
        fontSize: 14,
        fontColor: '#ffffff',
        alignment: 'center',
      },
      // Event Date & Location
      {
        name: 'eventSub',
        type: 'text',
        position: { x: 12, y: 24 },
        width: 81,
        height: 6,
        fontSize: 8,
        fontColor: '#e0e7ff',
        alignment: 'center',
      },
      // Attendee Badge Role (e.g. VIP / SPEAKER)
      {
        name: 'badgeRole',
        type: 'text',
        position: { x: 12, y: 44 },
        width: 81,
        height: 7,
        fontSize: 10,
        fontColor: '#6366f1',
        alignment: 'center',
      },
      // Attendee Full Name
      {
        name: 'attendeeName',
        type: 'text',
        position: { x: 10, y: 53 },
        width: 85,
        height: 12,
        fontSize: 18,
        fontColor: '#0f172a',
        alignment: 'center',
      },
      // Attendee Organization / Title
      {
        name: 'attendeeCompany',
        type: 'text',
        position: { x: 10, y: 67 },
        width: 85,
        height: 7,
        fontSize: 10,
        fontColor: '#64748b',
        alignment: 'center',
      },
      // Divider
      {
        name: 'badgeDivider',
        type: 'line',
        position: { x: 20, y: 78 },
        width: 65,
        height: 0.5,
        color: '#e2e8f0',
        readOnly: true,
      },
      // Access QR Code
      {
        name: 'accessQr',
        type: 'qrcode',
        position: { x: 34, y: 84 },
        width: 36,
        height: 36,
      },
      // Access Tag
      {
        name: 'accessTag',
        type: 'text',
        position: { x: 10, y: 124 },
        width: 85,
        height: 6,
        fontSize: 8,
        fontColor: '#475569',
        alignment: 'center',
      },
      // Barcode at bottom
      {
        name: 'ticketBarcode',
        type: 'code128',
        position: { x: 18, y: 132 },
        width: 68,
        height: 10,
      },
    ],
  ],
};

export const badgeDefinition: TemplateDefinition = {
  id: 'badge',
  name: 'Event Pass / ID Badge',
  description: 'Compact A6 event lanyard pass with high-visibility speaker/VIP badge, check-in QR code, and Code128 barcode.',
  category: 'Events',
  template: badgeTemplate,
  sampleInputs: [
    {
      eventName: 'TECHSUMMIT 2026',
      eventSub: 'November 25-28 • Moscone Center, SF',
      badgeRole: '★ KEYNOTE SPEAKER ★',
      attendeeName: 'Elena Rostova',
      attendeeCompany: 'VP of AI Research @ DeepMatrix',
      accessQr: 'https://pass.techsummit.io/v/TS26-SPK-902',
      accessTag: 'ALL-ACCESS • BACKSTAGE • VIP LOUNGE',
      ticketBarcode: 'TS26SPK902',
    },
  ],
};
