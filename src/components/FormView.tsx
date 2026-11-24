import React, { useEffect, useRef } from 'react';
import { Form } from '@pdfme/ui';
import type { Template } from '@pdfme/common';
import { getPlugins } from '../pdfme/plugins';
import { Edit3, Wand2, Trash2, Eye, Info } from 'lucide-react';
import type { AppMode } from '../types';

interface FormViewProps {
  template: Template;
  inputs: Record<string, string>[];
  onInputChange: (index: number, name: string, value: string) => void;
  onFillSampleData: () => void;
  onClearInputs: () => void;
  onSwitchMode: (mode: AppMode) => void;
}

export const FormView: React.FC<FormViewProps> = ({
  template,
  inputs,
  onInputChange,
  onFillSampleData,
  onClearInputs,
  onSwitchMode,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<Form | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (formRef.current) {
      formRef.current.destroy();
      formRef.current = null;
    }

    try {
      const plugins = getPlugins();
      const safeInputs = inputs && inputs.length > 0 ? inputs : [{}];
      const form = new Form({
        domContainer: containerRef.current,
        template,
        inputs: safeInputs,
        plugins,
      });

      form.onChangeInput(({ index, value, name }) => {
        onInputChange(index, name, value);
      });

      formRef.current = form;
    } catch (err) {
      console.error('Failed to initialize pdfme Form:', err);
    }

    return () => {
      if (formRef.current) {
        formRef.current.destroy();
        formRef.current = null;
      }
    };
  }, [template]); // Re-initialize when template changes

  // Update form inputs if updated externally (like Fill Sample or Clear)
  useEffect(() => {
    if (formRef.current) {
      const safeInputs = inputs && inputs.length > 0 ? inputs : [{}];
      formRef.current.setInputs(safeInputs);
    }
  }, [inputs]);

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 overflow-hidden">
      {/* Sub-header / Form Helper Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300 shrink-0">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="hidden md:inline text-slate-300">
            <strong>Form Mode:</strong> Enter values directly into the interactive fields below. All inputs sync in real-time with the Viewer and PDF output.
          </span>
          <span className="md:hidden text-slate-300">
            Interactive Form input fields
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onFillSampleData}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 px-2.5 py-1 rounded text-xs font-medium transition-colors"
            title="Auto-fill with sample demonstration data"
          >
            <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sample Data</span>
          </button>

          <button
            onClick={onClearInputs}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-300 border border-slate-700 px-2.5 py-1 rounded text-xs font-medium transition-colors"
            title="Clear all fields"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            onClick={() => onSwitchMode('viewer')}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Preview</span>
          </button>
        </div>
      </div>

      {/* pdfme Form Canvas Container */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-[calc(100vh-80px)] overflow-hidden relative bg-slate-900"
      />
    </div>
  );
};
