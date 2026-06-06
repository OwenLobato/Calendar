export interface CalendarEventUser {
  uid: string;
  name: string;
}

export interface CalendarEventItem {
  id?: string;
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user: CalendarEventUser;
}

/** Response body for POST /api/events and PUT /api/events/:id */
export interface CalendarEventApiResponse {
  ok: boolean;
  event: Pick<CalendarEventItem, 'id'> & Record<string, unknown>;
}

/** Response body for GET /api/events */
export interface CalendarEventsApiResponse {
  ok: boolean;
  events: CalendarEventItem[];
}
