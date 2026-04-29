import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';
import { Navbar } from '../';
import { localizer, getMessagesEs } from '../../helpers';

export interface CalendarEvent {
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

const events: CalendarEvent[] = [
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

export const CalendarPage = () => {
  const eventStyleGetter = (
    event: CalendarEvent,
    start: Date,
    end: Date,
    isSelected: boolean,
  ) => {
    console.log({ event, start, end, isSelected });

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

      <Calendar<CalendarEvent>
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
