import React from 'react';
import { TemplateGallery } from './TemplateGallery';
import { Template } from '../../types/board';
import { useBoards } from '../../hooks/useBoards';

interface BoardsViewProps {
  onNavigate: (tab: 'boards' | 'calendar' | 'files' | 'chat') => void;
}

export function BoardsView({ onNavigate }: BoardsViewProps) {
  const { templates, handleSelectTemplate } = useBoards();

  const handleTemplateClick = (template: Template) => {
    handleSelectTemplate(template);
    if (template.title === 'Gestão de Projetos') {
      onNavigate('calendar');
    } else if (template.title === 'Kanban Quadro Modelo') {
      onNavigate('files');
    }
  };

  return (
    <div className="space-y-8">
      <TemplateGallery
        templates={templates}
        onSelectTemplate={handleTemplateClick}
      />
    </div>
  );
}