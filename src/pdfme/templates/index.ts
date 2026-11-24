import { invoiceDefinition } from './invoice';
import { certificateDefinition } from './certificate';
import { badgeDefinition } from './badge';
import { blankDefinition } from './blank';
import type { TemplateDefinition } from '../../types';

export const TEMPLATES: TemplateDefinition[] = [
  invoiceDefinition,
  certificateDefinition,
  badgeDefinition,
  blankDefinition,
];

export const getTemplateById = (id: string): TemplateDefinition => {
  return TEMPLATES.find((t) => t.id === id) || invoiceDefinition;
};
