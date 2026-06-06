import { parseISO } from 'date-fns';
import type { CalendarEventItem } from '../calendar';

export const convertEventsToDate = (events: CalendarEventItem[]) => {
  return events.map((event) => {
    event.end = parseISO(String(event.end));
    event.start = parseISO(String(event.start));

    return event;
  });
};
