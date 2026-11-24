import React, { useEffect, useRef, useState } from 'react';
import { Designer } from '@pdfme/ui';
import type { Template } from '@pdfme/common';
import { getPlugins } from '../pdfme/plugins';
import { Info, Save, Sliders, CheckCircle2 } from 'lucide-react';

interface DesignerViewProps {
  template: Template;
  onTemplateChange: (template: Template) => void;
}

export const DesignerView: React.FC<DesignerViewProps> = ({
  template,
  onTemplateChange,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const designerRef = useRef<Designer | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [schemaCount, setSchemaCount] = useState<number>(() => {
    return template.schemas?.[0] ? template.schemas[0].length : 0;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean previous instance if any
    if (designerRef.current) {
      designerRef.current.destroy();
      designerRef.current = null;
    }

    try {
      const plugins = getPlugins();
      const designer = new Designer({
        domContainer: containerRef.current,
        template,
        plugins,
      });

      designer.onChangeTemplate((updatedTemplate: Template) => {
        const count = updatedTemplate.schemas?.[0] ? updatedTemplate.schemas[0].length : 0;
        setSchemaCount(count);
        onTemplateChange(updatedTemplate);
      });

      designer.onSaveTemplate((savedTemplate: Template) => {
        onTemplateChange(savedTemplate);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
      });

      designerRef.current = designer;
    } catch (err) {
      console.error('Failed to initialize pdfme Designer:', err);
    }

    return () => {
      if (designerRef.current) {
        designerRef.current.destroy();
        designerRef.current = null;
      }
    };
  }, [template]); // Re-initialize when template object is updated externally

  const handleManualSave = () => {
    if (designerRef.current) {
      designerRef.current.saveTemplate();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 overflow-hidden">
      {/* Sub-header / Designer Helper Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300 shrink-0">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="hidden md:inline text-slate-300">
            <strong>Designer Mode:</strong> Drag elements from the top palette onto the canvas. Resize, move, and edit properties in the right sidebar.
          </span>
          <span className="md:hidden text-slate-300">
            Design canvas & element properties
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-slate-800 border border-slate-700 px-2 py-1 rounded">
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] font-medium text-slate-300">
              {schemaCount} Schemas
            </span>
          </div>

          <button
            onClick={handleManualSave}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded font-medium text-xs transition-colors ${
              saveSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {saveSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Template</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* pdfme Designer Canvas Container */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-[calc(100vh-80px)] overflow-hidden relative bg-slate-900"
      />
    </div>
  );
};
