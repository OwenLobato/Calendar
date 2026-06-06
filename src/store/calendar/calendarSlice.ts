import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';
import { type CalendarEventItem } from '../../calendar/interfaces';

interface CalendarState {
  events: CalendarEventItem[];
  activeEvent: CalendarEventItem | null;
}

const tempEvent: CalendarEventItem = {
  id: String(new Date().getTime()),
  title: 'Cumpleaños del Jefe',
  notes: 'Comprar pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    uid: '123',
    name: 'Owen',
  },
};

const initialState: CalendarState = {
  events: [tempEvent],
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
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;
