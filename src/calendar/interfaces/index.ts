export interface CalendarEventUser {
  _id: string;
  name: string;
}

export interface CalendarEventItem {
  _id?: string;
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user: CalendarEventUser;
}
