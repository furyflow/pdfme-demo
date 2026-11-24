import { generate } from '@pdfme/generator';
import type { Template } from '@pdfme/common';
import { getPlugins } from './plugins';

export interface GeneratedPdfResult {
  blob: Blob;
  url: string;
  bytes: Uint8Array;
}

/**
 * Generates PDF bytes using @pdfme/generator and wraps it in a Blob & URL.
 */
export const generatePdfBlob = async (
  template: Template,
  inputs: Record<string, string>[]
): Promise<GeneratedPdfResult> => {
  const plugins = getPlugins();
  
  // Ensure we have at least one input entry
  const safeInputs = inputs && inputs.length > 0 ? inputs : [{}];

  const pdfBytes = await generate({
    template,
    inputs: safeInputs,
    plugins,
  });

  // Convert Uint8Array to Blob safely (Uint8Array.buffer might have offset in some environments)
  const safeBuffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength
  );
  const blob = new Blob([safeBuffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return { blob, url, bytes: pdfBytes };
};

/**
 * Triggers a browser download of the generated PDF file.
 */
export const downloadPdf = async (
  template: Template,
  inputs: Record<string, string>[],
  filename = 'generated-document.pdf'
): Promise<void> => {
  const { url } = await generatePdfBlob(template, inputs);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Cleanup object URL after a short delay
  setTimeout(() => URL.revokeObjectURL(url), 10000);
};

/**
 * Opens generated PDF in a new browser tab.
 */
export const openPdfInNewTab = async (
  template: Template,
  inputs: Record<string, string>[]
): Promise<void> => {
  const { url } = await generatePdfBlob(template, inputs);
  window.open(url, '_blank');
};
