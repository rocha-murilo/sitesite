import { useCallback } from 'react';
import { Template } from '../types/board';

export function useBoards() {
  const templates: Template[] = [
    {
      id: '1',
      title: 'Gestão de Projetos',
      description: 'Organize seus eventos e compromissos',
      icon: 'calendar',
      category: 'project'
    },
    {
      id: '2',
      title: 'Kanban Quadro Modelo',
      description: 'Compartilhe e gerencie seus arquivos',
      icon: 'files',
      category: 'files'
    },
    {
      id: '3',
      title: 'Chat',
      description: 'Converse em tempo real',
      icon: 'chat',
      category: 'communication'
    },
    {
      id: '4',
      title: 'Sistema de Produtividade Pessoal',
      description: 'Aumente sua produtividade pessoal',
      icon: 'productivity',
      category: 'personal'
    }
  ];

  const handleSelectTemplate = useCallback((template: Template) => {
    console.log('Template selecionado:', template);
  }, []);

  return {
    templates,
    handleSelectTemplate
  };
}