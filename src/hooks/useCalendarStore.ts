import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';
import { type CalendarEventItem } from '../calendar/interfaces';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent: CalendarEventItem): void => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (
    calendarEvent: CalendarEventItem,
  ): Promise<void> => {
    if (calendarEvent._id) {
      // Update
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Create
      dispatch(
        onAddNewEvent({ ...calendarEvent, _id: String(new Date().getTime()) }),
      );
    }
  };

  const startDeletingEvent = (): void => {
    dispatch(onDeleteEvent());
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
  };
};
