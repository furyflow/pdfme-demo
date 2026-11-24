import type { Template } from '@pdfme/common';
import type { TemplateDefinition } from '../../types';

export const invoiceTemplate: Template = {
  basePdf: {
    width: 210,
    height: 297,
    padding: [15, 15, 15, 15],
  },
  schemas: [
    [
      // Top header banner background
      {
        name: 'headerBg',
        type: 'rectangle',
        position: { x: 15, y: 15 },
        width: 180,
        height: 28,
        color: '#1e293b',
        borderColor: '#0f172a',
        borderWidth: 0,
        readOnly: true,
      },
      // Company Name
      {
        name: 'companyName',
        type: 'text',
        position: { x: 22, y: 20 },
        width: 90,
        height: 10,
        fontSize: 20,
        fontColor: '#ffffff',
      },
      // Company Tagline / Details
      {
        name: 'companyDetails',
        type: 'text',
        position: { x: 22, y: 31 },
        width: 90,
        height: 8,
        fontSize: 9,
        fontColor: '#94a3b8',
      },
      // Header Title "INVOICE"
      {
        name: 'invoiceTitle',
        type: 'text',
        position: { x: 130, y: 20 },
        width: 60,
        height: 10,
        fontSize: 20,
        fontColor: '#38bdf8',
        alignment: 'right',
      },
      // Invoice metadata (number & dates)
      {
        name: 'invoiceMeta',
        type: 'text',
        position: { x: 130, y: 31 },
        width: 60,
        height: 8,
        fontSize: 8,
        fontColor: '#cbd5e1',
        alignment: 'right',
      },

      // Bill To Label
      {
        name: 'billToLabel',
        type: 'text',
        position: { x: 15, y: 52 },
        width: 80,
        height: 6,
        fontSize: 10,
        fontColor: '#64748b',
        readOnly: true,
      },
      // Customer Details
      {
        name: 'customerDetails',
        type: 'text',
        position: { x: 15, y: 59 },
        width: 80,
        height: 22,
        fontSize: 10,
        fontColor: '#1e293b',
        lineHeight: 1.3,
      },

      // Payment info / Due Date box
      {
        name: 'paymentInfo',
        type: 'text',
        position: { x: 115, y: 52 },
        width: 80,
        height: 28,
        fontSize: 9,
        fontColor: '#334155',
        lineHeight: 1.3,
        alignment: 'right',
      },

      // Separator line
      {
        name: 'sep1',
        type: 'line',
        position: { x: 15, y: 88 },
        width: 180,
        height: 0.5,
        color: '#e2e8f0',
        readOnly: true,
      },

      // Line Items Table
      {
        name: 'itemsTable',
        type: 'table',
        position: { x: 15, y: 95 },
        width: 180,
        height: 60,
        showHead: true,
        head: ['Description', 'Qty', 'Unit Price', 'Amount'],
        headWidthPercentages: [50, 15, 17, 18],
        tableStyles: { borderColor: '#e2e8f0', borderWidth: 0.5 },
        headStyles: {
          alignment: 'left',
          verticalAlignment: 'middle',
          fontSize: 9,
          lineHeight: 1,
          characterSpacing: 0,
          fontColor: '#ffffff',
          backgroundColor: '#1e293b',
          borderColor: '#1e293b',
          borderWidth: { top: 0, right: 0, bottom: 0, left: 0 },
          padding: { top: 3, right: 3, bottom: 3, left: 3 },
        },
        bodyStyles: {
          alignment: 'left',
          verticalAlignment: 'middle',
          fontSize: 9,
          lineHeight: 1,
          characterSpacing: 0,
          fontColor: '#334155',
          backgroundColor: '#ffffff',
          alternateBackgroundColor: '#f8fafc',
          borderColor: '#e2e8f0',
          borderWidth: { top: 0.2, right: 0.2, bottom: 0.2, left: 0.2 },
          padding: { top: 2.5, right: 3, bottom: 2.5, left: 3 },
        },
        columnStyles: {
          alignment: {
            1: 'center',
            2: 'right',
            3: 'right',
          },
        },
      },

      // Subtotal & Total Summary
      {
        name: 'totalsSummary',
        type: 'text',
        position: { x: 110, y: 175 },
        width: 85,
        height: 25,
        fontSize: 10,
        fontColor: '#1e293b',
        lineHeight: 1.4,
        alignment: 'right',
      },

      // Notes & Bank details
      {
        name: 'notesLabel',
        type: 'text',
        position: { x: 15, y: 215 },
        width: 100,
        height: 5,
        fontSize: 9,
        fontColor: '#64748b',
        readOnly: true,
      },
      {
        name: 'notes',
        type: 'text',
        position: { x: 15, y: 221 },
        width: 100,
        height: 20,
        fontSize: 8,
        fontColor: '#475569',
        lineHeight: 1.3,
      },

      // Payment QR Code
      {
        name: 'paymentQr',
        type: 'qrcode',
        position: { x: 145, y: 212 },
        width: 32,
        height: 32,
      },
      {
        name: 'qrCaption',
        type: 'text',
        position: { x: 130, y: 246 },
        width: 62,
        height: 5,
        fontSize: 7,
        fontColor: '#64748b',
        alignment: 'center',
      },

      // Barcode at bottom
      {
        name: 'invoiceBarcode',
        type: 'code128',
        position: { x: 15, y: 260 },
        width: 70,
        height: 18,
      },
    ],
  ],
};

export const invoiceDefinition: TemplateDefinition = {
  id: 'invoice',
  name: 'Modern Corporate Invoice',
  description: 'Complete commercial invoice with table line items, totals calculation, QR code payment & Code128 barcode.',
  category: 'Business',
  template: invoiceTemplate,
  sampleInputs: [
    {
      companyName: 'Acme Technologies Inc.',
      companyDetails: '123 Innovation Way, Suite 400 • San Francisco, CA\ncontact@acmetech.io • +1 (555) 019-2834',
      invoiceTitle: 'INVOICE',
      invoiceMeta: 'Invoice #: INV-2026-0881\nDate: Nov 23, 2026\nDue Date: Dec 07, 2026',
      billToLabel: 'BILLED TO:',
      customerDetails: 'Nova Systems Global Ltd.\nAttn: Sarah Jenkins\n784 Enterprise Blvd, Floor 12\nAustin, TX 78701\nVAT: US-8932014-99',
      paymentInfo: 'Payment Terms: Net 14 Days\nPO Reference: PO-99231\nStatus: Unpaid',
      itemsTable: JSON.stringify([
        ['Enterprise Cloud Platform License (Annual)', '1', '$14,400.00', '$14,400.00'],
        ['Dedicated Solutions Architect Support (40 hrs)', '40', '$150.00', '$6,000.00'],
        ['Data Pipeline Migration & ETL Setup', '1', '$3,500.00', '$3,500.00'],
        ['Security Audit & Compliance Certificate', '1', '$2,200.00', '$2,200.00'],
      ]),
      totalsSummary: 'Subtotal:  $26,100.00\nTax (8.25%):  $2,153.25\nDiscount (5%): -$1,305.00\n\nTOTAL DUE:  $26,948.25',
      notesLabel: 'PAYMENT TERMS & INSTRUCTIONS:',
      notes: 'Please remit payment via ACH or Wire Transfer.\nBank: Silicon Valley Commercial Bank\nRouting #: 121000358 • Account #: 8829-4401-291\nThank you for choosing Acme Technologies!',
      paymentQr: 'https://pay.acmetech.io/invoice/INV-2026-0881',
      qrCaption: 'Scan to pay online securely',
      invoiceBarcode: 'INV20260881',
    },
  ],
};
