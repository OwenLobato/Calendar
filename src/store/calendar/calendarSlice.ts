import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';
import { type CalendarEventItem } from '../../calendar/interfaces';

interface CalendarState {
  events: CalendarEventItem[];
  activeEvent: CalendarEventItem | null;
}

const tempEvent: CalendarEventItem = {
  _id: String(new Date().getTime()),
  title: 'Cumpleaños del Jefe',
  notes: 'Comprar pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
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
  },
});

export const { onSetActiveEvent } = calendarSlice.actions;
