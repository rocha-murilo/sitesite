import React from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { EventColor } from '../../types/event';

interface EventFormProps {
  selectedDate: Date;
  onSubmit: (event: { title: string; description: string; time: string; color: EventColor }) => void;
  onClose: () => void;
}

export function EventForm({ selectedDate, onSubmit, onClose }: EventFormProps) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [time, setTime] = React.useState('12:00');
  const [color, setColor] = React.useState<EventColor>('blue');

  const colors: { value: EventColor; label: string }[] = [
    { value: 'blue', label: 'Azul' },
    { value: 'red', label: 'Vermelho' },
    { value: 'green', label: 'Verde' },
    { value: 'purple', label: 'Roxo' },
    { value: 'yellow', label: 'Amarelo' },
    { value: 'pink', label: 'Rosa' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, time, color });
    setTitle('');
    setDescription('');
    setTime('12:00');
    setColor('blue');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Novo Evento - {format(selectedDate, 'dd/MM/yyyy')}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cor
          </label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setColor(c.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  color === c.value ? 'ring-2 ring-offset-2' : ''
                } bg-${c.value}-500 hover:opacity-90`}
                title={c.label}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horário
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Adicionar Evento
        </button>
      </form>
    </div>
  );
}