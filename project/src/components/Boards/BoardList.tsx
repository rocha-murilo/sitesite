import React from 'react';
import { Board } from '../../types/board';
import { LayoutGrid, Users, Settings } from 'lucide-react';

interface BoardListProps {
  workspace: {
    id: string;
    title: string;
    members: number;
    boards: Board[];
  };
}

export function BoardList({ workspace }: BoardListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white font-medium">
              {workspace.title.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-lg font-medium text-gray-900">{workspace.title}</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Users className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspace.boards.map((board) => (
          <div
            key={board.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {board.cover ? (
              <img
                src={board.cover}
                alt={board.title}
                className="w-full h-32 object-cover"
              />
            ) : (
              <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-500" />
            )}
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{board.title}</h3>
              {board.description && (
                <p className="text-sm text-gray-500 mt-1">{board.description}</p>
              )}
            </div>
          </div>
        ))}
        <button className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors">
          <LayoutGrid className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm font-medium text-gray-600">
            Criar novo quadro
          </span>
        </button>
      </div>
    </div>
  );
}