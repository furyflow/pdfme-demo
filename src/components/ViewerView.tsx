import React, { useEffect, useRef } from 'react';
import { Viewer } from '@pdfme/ui';
import type { Template } from '@pdfme/common';
import { getPlugins } from '../pdfme/plugins';
import { Eye, Edit3, FileDown, Info } from 'lucide-react';
import type { AppMode } from '../types';

interface ViewerViewProps {
  template: Template;
  inputs: Record<string, string>[];
  onSwitchMode: (mode: AppMode) => void;
  onGeneratePdf: () => void;
  isGenerating: boolean;
}

export const ViewerView: React.FC<ViewerViewProps> = ({
  template,
  inputs,
  onSwitchMode,
  onGeneratePdf,
  isGenerating,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (viewerRef.current) {
      viewerRef.current.destroy();
      viewerRef.current = null;
    }

    try {
      const plugins = getPlugins();
      const safeInputs = inputs && inputs.length > 0 ? inputs : [{}];
      const viewer = new Viewer({
        domContainer: containerRef.current,
        template,
        inputs: safeInputs,
        plugins,
      });

      viewerRef.current = viewer;
    } catch (err) {
      console.error('Failed to initialize pdfme Viewer:', err);
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [template]); // Re-initialize when template changes

  // Update viewer when inputs change
  useEffect(() => {
    if (viewerRef.current) {
      const safeInputs = inputs && inputs.length > 0 ? inputs : [{}];
      viewerRef.current.setInputs(safeInputs);
    }
  }, [inputs]);

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 overflow-hidden">
      {/* Sub-header / Viewer Helper Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300 shrink-0">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="hidden md:inline text-slate-300">
            <strong>Viewer Mode:</strong> Accurate preview of the generated document with all form fields, tables, barcodes, and styles applied.
          </span>
          <span className="md:hidden text-slate-300">
            Read-only document preview
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSwitchMode('form')}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 px-2.5 py-1 rounded text-xs font-medium transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Form Values</span>
          </button>

          <button
            onClick={onGeneratePdf}
            disabled={isGenerating}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
          >
            {isGenerating ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <FileDown className="w-3.5 h-3.5" />
            )}
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* pdfme Viewer Canvas Container */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-[calc(100vh-80px)] overflow-hidden relative bg-slate-900"
      />
    </div>
  );
};
