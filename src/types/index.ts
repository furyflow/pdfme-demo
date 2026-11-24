import type { Template } from '@pdfme/common';

export type AppMode = 'designer' | 'form' | 'viewer';

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  category: 'Business' | 'Education' | 'Events' | 'Custom';
  template: Template;
  sampleInputs: Record<string, string>[];
}

export interface PdfmeInputRecord {
  [key: string]: string;
}
