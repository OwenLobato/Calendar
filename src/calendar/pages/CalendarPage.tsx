import { useState } from 'react';
import { Calendar, type EventPropGetter, type View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CalendarModal, Navbar } from '../';
import { localizer, getMessagesEs } from '../../helpers';
import { type CalendarEventItem } from '../interfaces';
import { useUiStore, useCalendarStore } from '../../hooks';

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  const [lastView, setLastView] = useState<View>(
    (localStorage.getItem('lastView') as View) ?? 'week',
  );

  const eventStyleGetter: EventPropGetter<CalendarEventItem> = (
    _event,
    _start,
    _end,
    _isSelected,
  ) => {
    const style: React.CSSProperties = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return { style };
  };

  const onDoubleClick = (event: CalendarEventItem): void => {
    openDateModal();
  };

  const onSelect = (event: CalendarEventItem): void => {
    setActiveEvent(event);
  };

  const onViewChanged = (view: View): void => {
    setLastView(view);
    localStorage.setItem('lastView', view);
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
