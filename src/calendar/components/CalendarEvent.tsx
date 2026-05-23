import { type CalendarEventItem } from '../pages/CalendarPage';

interface Props {
  event: CalendarEventItem;
}

export const CalendarEvent = ({ event }: Props) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};
