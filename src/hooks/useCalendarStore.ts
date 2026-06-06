import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';
import type { RootState } from '../store';
import {
  type CalendarEventItem,
  type CalendarEventApiResponse,
  type CalendarEventsApiResponse,
} from '../calendar/interfaces';
import { calendarApi } from '../api';
import { convertEventsToDate } from '../helpers';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar,
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const setActiveEvent = (calendarEvent: CalendarEventItem): void => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (
    calendarEvent: CalendarEventItem,
  ): Promise<void> => {
    if (calendarEvent.id) {
      // Update
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Create
      const { data } = await calendarApi.post<CalendarEventApiResponse>(
        '/events',
        calendarEvent,
      );
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          id: data.event.id,
          user: { uid: user.uid!, name: user.name! },
        }),
      );
    }
  };

  const startDeletingEvent = (): void => {
    dispatch(onDeleteEvent());
  };

  const startLoadingEvent = async () => {
    try {
      const { data } =
        await calendarApi.get<CalendarEventsApiResponse>('/events');

      const events = convertEventsToDate(data.events);
      console.log(`🚀 ~ startLoadingEvent ~ events:`, events);
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvent,
  };
};
