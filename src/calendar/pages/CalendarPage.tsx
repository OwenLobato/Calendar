import { useState } from 'react';
import { Calendar, type View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';
import { CalendarEvent, CalendarModal, Navbar } from '../';
import { localizer, getMessagesEs } from '../../helpers';

export interface CalendarEventItem {
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user: {
    _id: string;
    name: string;
  };
}

const events: CalendarEventItem[] = [
  {
    title: 'Cumpleaños del Jefe',
    notes: 'Comprar pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Owen',
    },
  },
];

const onDoubleClick = (event: CalendarEventItem) => {
  console.log({ doubleClick: event });
};

const onSelect = (event: CalendarEventItem) => {
  console.log({ click: event });
};
const onViewChanged = (view: View) => {
  localStorage.setItem('lastView', view);
};

export const CalendarPage = () => {
  const [lastView, setLastView] = useState<View>(
    (localStorage.getItem('lastView') as View) || 'week',
  );

  const eventStyleGetter = (
    event: CalendarEventItem,
    start: Date,
    end: Date,
    isSelected: boolean,
  ) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return { style };
  };

  return (
    <>
      <Navbar />

      <Calendar<CalendarEventItem>
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  );
};
