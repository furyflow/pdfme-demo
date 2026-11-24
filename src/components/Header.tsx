import React from 'react';
import {
  Palette,
  FileCheck2,
  Eye,
  FileDown,
  Layers,
  Code2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import type { AppMode, TemplateDefinition } from '../types';

interface HeaderProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  activeTemplate: TemplateDefinition;
  onOpenTemplateSelector: () => void;
  onOpenJsonModal: (type: 'template' | 'inputs') => void;
  onResetTemplate: () => void;
  onGeneratePdf: () => void;
  isGenerating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onModeChange,
  activeTemplate,
  onOpenTemplateSelector,
  onOpenJsonModal,
  onResetTemplate,
  onGeneratePdf,
  isGenerating,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2.5 flex items-center justify-between select-none shadow-md z-30 relative">
      {/* Brand & Active Template */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 rounded-lg shadow-sm">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="font-bold tracking-tight text-sm">pdfme Studio</span>
        </div>

        <button
          onClick={onOpenTemplateSelector}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-all group"
          title="Switch Template"
        >
          <Layers className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
          <span className="max-w-[150px] truncate">{activeTemplate.name}</span>
          <span className="bg-slate-700 text-slate-300 text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold">
            {activeTemplate.category}
          </span>
        </button>
      </div>

      {/* Center: Mode Switcher (Designer, Form, Viewer) */}
      <div className="flex items-center bg-slate-800/90 border border-slate-700 p-1 rounded-xl shadow-inner">
        <button
          onClick={() => onModeChange('designer')}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === 'designer'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Designer</span>
        </button>

        <button
          onClick={() => onModeChange('form')}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === 'form'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Form</span>
        </button>

        <button
          onClick={() => onModeChange('viewer')}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === 'viewer'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Viewer</span>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-2">
        {/* JSON Inspector / Editor */}
        <div className="relative group">
          <button
            onClick={() => onOpenJsonModal('template')}
            className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-lg transition-colors"
            title="Inspect / Edit Raw JSON Schema"
          >
            <Code2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">JSON</span>
          </button>
        </div>

        {/* Reset to template defaults */}
        <button
          onClick={onResetTemplate}
          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
          title="Reset to Template Defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Generate PDF Button */}
        <button
          onClick={onGeneratePdf}
          disabled={isGenerating}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-sm transition-all transform active:scale-95"
        >
          {isGenerating ? (
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <FileDown className="w-4 h-4" />
          )}
          <span>Generate PDF</span>
        </button>
      </div>
    </header>
  );
};
