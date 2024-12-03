export type EventColor = 'blue' | 'red' | 'green' | 'purple' | 'yellow' | 'pink';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  color: EventColor;
}