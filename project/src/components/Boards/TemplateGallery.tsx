import React from 'react';
import { Template } from '../../types/board';
import { Calendar, FileText, MessageSquare, Brain } from 'lucide-react';

interface TemplateGalleryProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
}

function getTemplateIcon(icon: string) {
  switch (icon) {
    case 'calendar':
      return <Calendar className="w-8 h-8 text-white" />;
    case 'files':
      return <FileText className="w-8 h-8 text-white" />;
    case 'chat':
      return <MessageSquare className="w-8 h-8 text-white" />;
    case 'productivity':
      return <Brain className="w-8 h-8 text-white" />;
    default:
      return null;
  }
}

export function TemplateGallery({ templates, onSelectTemplate }: TemplateGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Templates mais populares</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {getTemplateIcon(template.icon)}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs text-white mb-2">
                Template
              </span>
              <h3 className="text-white font-medium">{template.title}</h3>
              <p className="text-white/80 text-sm mt-1">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}