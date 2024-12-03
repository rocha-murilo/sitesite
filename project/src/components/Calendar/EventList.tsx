import React from 'react';
import { format } from 'date-fns';
import { CalendarEvent, EventColor } from '../../types/event';
import { Trash2 } from 'lucide-react';
import { EventCard } from './EventCard';

interface EventListProps {
  events: CalendarEvent[];
  onDelete: (id: string) => void;
}

export function EventList({ events, onDelete }: EventListProps) {
  const [selectedColor, setSelectedColor] = React.useState<EventColor | 'all'>('all');
  const [selectedEvents, setSelectedEvents] = React.useState<CalendarEvent[]>([]);
  const [showEventCard, setShowEventCard] = React.useState(false);

  const colors: { value: EventColor; label: string }[] = [
    { value: 'blue', label: 'Azul' },
    { value: 'red', label: 'Vermelho' },
    { value: 'green', label: 'Verde' },
    { value: 'purple', label: 'Roxo' },
    { value: 'yellow', label: 'Amarelo' },
    { value: 'pink', label: 'Rosa' }
  ];

  const filteredEvents = selectedColor === 'all' 
    ? events 
    : events.filter(event => event.color === selectedColor);

  const handleEventClick = (clickedEvent: CalendarEvent) => {
    const eventsOnSameDay = events.filter(event => 
      format(new Date(event.date), 'yyyy-MM-dd') === format(new Date(clickedEvent.date), 'yyyy-MM-dd')
    );
    setSelectedEvents(eventsOnSameDay);
    setShowEventCard(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-600">Filtrar por cor:</span>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value as EventColor | 'all')}
          className="px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todas as cores</option>
          {colors.map(color => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">
          Nenhum evento encontrado
          {selectedColor !== 'all' && ' para esta cor'}
        </p>
      ) : (
        filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-start cursor-pointer hover:bg-gray-50"
            onClick={() => handleEventClick(event)}
          >
            <div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-${event.color}-500`} />
                <h4 className="font-medium text-gray-900">{event.title}</h4>
                <span className="text-sm text-gray-500">
                  {format(new Date(event.date), 'dd/MM/yyyy')} às {event.time}
                </span>
              </div>
              {event.description && (
                <p className="text-gray-600 mt-1">{event.description}</p>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(event.id);
              }}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))
      )}

      {showEventCard && (
        <EventCard
          events={selectedEvents}
          onClose={() => setShowEventCard(false)}
        />
      )}
    </div>
  );
}