import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
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
import Swal from 'sweetalert2';

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
    try {
      // Update
      if (calendarEvent.id) {
        await calendarApi.put<CalendarEventApiResponse>(
          `/events/${calendarEvent.id}`,
          calendarEvent,
        );
        dispatch(onUpdateEvent({ ...calendarEvent }));
        return;
      }

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
    } catch (error) {
      console.log({ error });
      Swal.fire('Error al guardar', error.response.data?.msg, 'error');
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
      dispatch(onLoadEvents(events));
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
