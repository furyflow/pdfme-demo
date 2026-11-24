import React from 'react';
import { X, FileText, Award, CreditCard, PlusCircle, Check } from 'lucide-react';
import { TEMPLATES } from '../pdfme/templates';
import type { TemplateDefinition } from '../types';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  activeTemplateId: string;
  onSelectTemplate: (template: TemplateDefinition) => void;
}

const getTemplateIcon = (id: string) => {
  switch (id) {
    case 'invoice':
      return <FileText className="w-5 h-5 text-blue-400" />;
    case 'certificate':
      return <Award className="w-5 h-5 text-amber-400" />;
    case 'badge':
      return <CreditCard className="w-5 h-5 text-indigo-400" />;
    default:
      return <PlusCircle className="w-5 h-5 text-emerald-400" />;
  }
};

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  isOpen,
  onClose,
  activeTemplateId,
  onSelectTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div>
            <h3 className="text-base font-semibold text-white">Choose a PDF Template</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a pre-configured template with schemas, layout and sample data.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          {TEMPLATES.map((tmpl) => {
            const isSelected = tmpl.id === activeTemplateId;
            return (
              <div
                key={tmpl.id}
                onClick={() => {
                  onSelectTemplate(tmpl);
                  onClose();
                }}
                className={`relative group rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                      {getTemplateIcon(tmpl.id)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 uppercase tracking-wider">
                        {tmpl.category}
                      </span>
                      {isSelected && (
                        <span className="flex items-center space-x-1 text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                          <Check className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {tmpl.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400">
                  <span>
                    Paper:{' '}
                    {typeof tmpl.template.basePdf === 'object' && 'width' in tmpl.template.basePdf
                      ? `${tmpl.template.basePdf.width} × ${tmpl.template.basePdf.height} mm`
                      : 'Custom PDF'}
                  </span>
                  <span className="font-medium text-blue-400 group-hover:underline">
                    {isSelected ? 'Currently Selected' : 'Load Template →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 border border-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
