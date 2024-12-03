import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarEvent } from '../../types/event';
import { X, Clock, GripVertical, Pencil } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EventCardProps {
  events: CalendarEvent[];
  onClose: () => void;
}

interface SortableEventItemProps {
  event: CalendarEvent;
  onEdit: (event: CalendarEvent) => void;
}

function SortableEventItem({ event, onEdit }: SortableEventItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded-lg border-l-4 border-${event.color}-500 bg-${event.color}-50`}
    >
      <div className="flex items-start gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab hover:text-gray-600 mt-1"
        >
          <GripVertical className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                {event.title}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              {event.description && (
                <p className="mt-2 text-gray-600">{event.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(event)}
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <div className={`w-3 h-3 rounded-full bg-${event.color}-500`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventCard({ events: initialEvents, onClose }: EventCardProps) {
  const [events, setEvents] = useState(initialEvents);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setEvents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleEditEvent = (event: CalendarEvent) => {
    // Here you would implement the edit functionality
    console.log('Edit event:', event);
  };

  if (events.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Eventos do dia {format(new Date(events[0].date), 'dd/MM/yyyy')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={events}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {events.map((event) => (
                  <SortableEventItem
                    key={event.id}
                    event={event}
                    onEdit={handleEditEvent}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
        
        <div className="p-4 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}