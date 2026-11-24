import {
  text,
  multiVariableText,
  image,
  svg,
  table,
  line,
  rectangle,
  ellipse,
  dateTime,
  date,
  time,
  select,
  radioGroup,
  checkbox,
  circleMark,
  barcodes,
} from '@pdfme/schemas';
import type { Plugins } from '@pdfme/common';

/**
 * Standard registry containing all schema plugins supported by pdfme.
 * Passed to Designer, Form, Viewer, and generator.
 */
export const getPlugins = (): Plugins => {
  return {
    // Basic & Text
    text,
    'multi-variable-text': multiVariableText,
    
    // Graphics & Media
    image,
    svg,

    // Tables & Shapes
    table,
    line,
    rectangle,
    ellipse,

    // Form inputs / Date
    dateTime,
    date,
    time,
    select,
    radioGroup,
    checkbox,
    circleMark,

    // Barcodes & 2D codes
    qrcode: barcodes.qrcode,
    code128: barcodes.code128,
    code39: barcodes.code39,
    ean13: barcodes.ean13,
    ean8: barcodes.ean8,
    japanpost: barcodes.japanpost,
    upca: barcodes.upca,
    upce: barcodes.upce,
    pdf417: barcodes.pdf417,
  };
};
