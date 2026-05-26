import { useDispatch, useSelector } from 'react-redux';
import { onSetActiveEvent } from '../store';
import { type CalendarEventItem } from '../calendar/interfaces';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent: CalendarEventItem): void => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
  };
};
