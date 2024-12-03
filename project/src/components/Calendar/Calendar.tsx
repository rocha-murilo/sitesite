import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarEvent } from '../../types/event';
import { EventCard } from './EventCard';

interface CalendarProps {
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  selectedDate: Date | null;
}

export function Calendar({ events, onDateClick, selectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [showEventCard, setShowEventCard] = React.useState(false);
  const [selectedEvents, setSelectedEvents] = React.useState<CalendarEvent[]>([]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateDoubleClick = (day: Date) => {
    const dayEvents = events.filter((event) =>
      isSameDay(new Date(event.date), day)
    );
    setSelectedEvents(dayEvents);
    setShowEventCard(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center py-4 font-medium text-gray-600 border-r last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 h-[calc(100vh-16rem)]">
          {days.map((day, index) => {
            const dayEvents = events.filter((event) =>
              isSameDay(new Date(event.date), day)
            );
            
            return (
              <button
                key={day.toISOString()}
                onClick={() => onDateClick(day)}
                onDoubleClick={() => handleDateDoubleClick(day)}
                className={`
                  relative p-4 border-r border-b hover:bg-gray-50 transition-colors
                  ${!isSameMonth(day, monthStart) ? 'bg-gray-50' : ''}
                  ${selectedDate && isSameDay(day, selectedDate) ? 'bg-blue-50' : ''}
                  ${isToday(day) ? 'bg-blue-50/30' : ''}
                  ${index % 7 === 6 ? 'border-r-0' : ''}
                  ${Math.floor(index / 7) === 5 ? 'border-b-0' : ''}
                `}
              >
                <div className="flex flex-col h-full">
                  <span className={`
                    text-lg font-medium mb-2
                    ${isToday(day) ? 'text-blue-600' : 'text-gray-700'}
                    ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''}
                  `}>
                    {format(day, 'd')}
                  </span>
                  
                  <div className="flex-1">
                    {dayEvents.slice(0, 3).map((event, i) => (
                      <div
                        key={event.id}
                        className={`
                          mb-1 px-2 py-1 rounded text-xs truncate
                          bg-${event.color}-100 text-${event.color}-700 border border-${event.color}-200
                        `}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 mt-1">
                        +{dayEvents.length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showEventCard && selectedEvents.length > 0 && (
        <EventCard
          events={selectedEvents}
          onClose={() => setShowEventCard(false)}
        />
      )}
    </div>
  );
}