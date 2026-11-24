import React, { useState, useCallback } from 'react';
import type { Template } from '@pdfme/common';
import type { AppMode, TemplateDefinition } from './types';
import { TEMPLATES, getTemplateById } from './pdfme/templates';
import { generatePdfBlob } from './pdfme/generator';
import { Header } from './components/Header';
import { DesignerView } from './components/DesignerView';
import { FormView } from './components/FormView';
import { ViewerView } from './components/ViewerView';
import { TemplateSelector } from './components/TemplateSelector';
import { JsonModal } from './components/JsonModal';
import { PdfExportModal } from './components/PdfExportModal';

export const App: React.FC = () => {
  // Current active mode: designer | form | viewer
  const [mode, setMode] = useState<AppMode>('designer');

  // Currently loaded template definition (defaults to Invoice)
  const [activeTemplateDef, setActiveTemplateDef] = useState<TemplateDefinition>(() => TEMPLATES[0]);

  // Working template (can be modified by Designer or JSON modal)
  const [currentTemplate, setCurrentTemplate] = useState<Template>(() => TEMPLATES[0].template);

  // Form input data values
  const [inputs, setInputs] = useState<Record<string, string>[]>(() => TEMPLATES[0].sampleInputs);

  // Modals state
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [jsonModal, setJsonModal] = useState<{ open: boolean; type: 'template' | 'inputs' }>({
    open: false,
    type: 'template',
  });
  const [exportModal, setExportModal] = useState<{ open: boolean; url: string | null }>({
    open: false,
    url: null,
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Handle template selection from selector
  const handleSelectTemplate = useCallback((selectedDef: TemplateDefinition) => {
    setActiveTemplateDef(selectedDef);
    setCurrentTemplate(selectedDef.template);
    setInputs(selectedDef.sampleInputs);
  }, []);

  // Reset template to default
  const handleResetTemplate = useCallback(() => {
    const original = getTemplateById(activeTemplateDef.id);
    setCurrentTemplate(original.template);
    setInputs(original.sampleInputs);
  }, [activeTemplateDef.id]);

  // Handle template modifications from Designer
  const handleTemplateChange = useCallback((updatedTemplate: Template) => {
    setCurrentTemplate(updatedTemplate);
  }, []);

  // Handle Form input field modifications
  const handleInputChange = useCallback((index: number, name: string, value: string) => {
    setInputs((prev) => {
      const next = [...prev];
      if (!next[index]) {
        next[index] = {};
      }
      next[index] = { ...next[index], [name]: value };
      return next;
    });
  }, []);

  // Fill sample data
  const handleFillSampleData = useCallback(() => {
    setInputs(activeTemplateDef.sampleInputs);
  }, [activeTemplateDef.sampleInputs]);

  // Clear inputs
  const handleClearInputs = useCallback(() => {
    setInputs([{}]);
  }, []);

  // Generate PDF and open export dialog
  const handleGeneratePdf = async () => {
    setIsGenerating(true);
    try {
      const { url } = await generatePdfBlob(currentTemplate, inputs);
      setExportModal({ open: true, url });
    } catch (err: any) {
      console.error('Failed to generate PDF:', err);
      alert(`Error generating PDF: ${err?.message || err}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 select-none">
      {/* Top Main Navigation Header */}
      <Header
        mode={mode}
        onModeChange={setMode}
        activeTemplate={activeTemplateDef}
        onOpenTemplateSelector={() => setIsTemplateSelectorOpen(true)}
        onOpenJsonModal={(type) => setJsonModal({ open: true, type })}
        onResetTemplate={handleResetTemplate}
        onGeneratePdf={handleGeneratePdf}
        isGenerating={isGenerating}
      />

      {/* Main Workspace Area: Designer, Form, or Viewer */}
      <main className="flex-1 w-full h-[calc(100vh-50px)] overflow-hidden relative">
        {mode === 'designer' && (
          <DesignerView
            key={`designer-${activeTemplateDef.id}`}
            template={currentTemplate}
            onTemplateChange={handleTemplateChange}
          />
        )}

        {mode === 'form' && (
          <FormView
            key={`form-${activeTemplateDef.id}`}
            template={currentTemplate}
            inputs={inputs}
            onInputChange={handleInputChange}
            onFillSampleData={handleFillSampleData}
            onClearInputs={handleClearInputs}
            onSwitchMode={setMode}
          />
        )}

        {mode === 'viewer' && (
          <ViewerView
            key={`viewer-${activeTemplateDef.id}`}
            template={currentTemplate}
            inputs={inputs}
            onSwitchMode={setMode}
            onGeneratePdf={handleGeneratePdf}
            isGenerating={isGenerating}
          />
        )}
      </main>

      {/* Template Selector Modal */}
      <TemplateSelector
        isOpen={isTemplateSelectorOpen}
        onClose={() => setIsTemplateSelectorOpen(false)}
        activeTemplateId={activeTemplateDef.id}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Raw JSON Inspector / Editor Modal */}
      <JsonModal
        isOpen={jsonModal.open}
        onClose={() => setJsonModal({ open: false, type: 'template' })}
        type={jsonModal.type}
        data={jsonModal.type === 'template' ? currentTemplate : inputs}
        onSave={(updatedData) => {
          if (jsonModal.type === 'template') {
            setCurrentTemplate(updatedData);
          } else {
            setInputs(Array.isArray(updatedData) ? updatedData : [updatedData]);
          }
        }}
      />

      {/* PDF Export & Preview Modal */}
      <PdfExportModal
        isOpen={exportModal.open}
        onClose={() => {
          if (exportModal.url) {
            URL.revokeObjectURL(exportModal.url);
          }
          setExportModal({ open: false, url: null });
        }}
        pdfUrl={exportModal.url}
        defaultFilename={`${activeTemplateDef.id}-export.pdf`}
      />
    </div>
  );
};

export default App;
