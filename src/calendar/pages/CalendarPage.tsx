import { useEffect, useState, type CSSProperties } from 'react';
import { Calendar, type EventPropGetter, type View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from '../';
import { localizer, getMessagesEs } from '../../helpers';
import { type CalendarEventItem } from '../interfaces';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();
  const [lastView, setLastView] = useState<View>(
    (localStorage.getItem('lastView') as View) ?? 'week',
  );

  const eventStyleGetter: EventPropGetter<CalendarEventItem> = (
    event,
    _start,
    _end,
    _isSelected,
  ) => {
    const isMyEvent =
      user.uid === event.user.uid || user.uid === event.user._id;

    const style: CSSProperties = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return { style };
  };

  const onDoubleClick = (_event: CalendarEventItem): void => {
    openDateModal();
  };

  const onSelect = (event: CalendarEventItem): void => {
    setActiveEvent(event);
  };

  const onViewChanged = (view: View): void => {
    setLastView(view);
    localStorage.setItem('lastView', view);
  };

  useEffect(() => {
    startLoadingEvent();
  }, []);

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

      <FabAddNew />
      <FabDelete />
    </>
  );
};
