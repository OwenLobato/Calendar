import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CalendarEventItem } from '../../calendar/interfaces';

interface CalendarState {
  isLoadingEvents: boolean;
  events: CalendarEventItem[];
  activeEvent: CalendarEventItem | null;
}

const initialState: CalendarState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (
      state,
      { payload }: PayloadAction<CalendarEventItem>,
    ) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }: PayloadAction<CalendarEventItem>) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }: PayloadAction<CalendarEventItem>) => {
      state.events = state.events.map((event) =>
        event.id === payload.id ? payload : event,
      );
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent?.id,
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload }: PayloadAction<CalendarEventItem[]>) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogutCalendar: (state) => {
      state.isLoadingEvents = false;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogutCalendar,
} = calendarSlice.actions;
