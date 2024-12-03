import { useState, useCallback } from 'react';
import { CalendarEvent } from '../types/event';

export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const addEvent = useCallback((date: Date, eventData: { title: string; description: string; time: string; color: string }) => {
    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).substring(2),
      date,
      ...eventData
    };

    setEvents((prev) => [...prev, newEvent]);
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  return {
    events,
    addEvent,
    deleteEvent
  };
}