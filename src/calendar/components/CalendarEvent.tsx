import { type CalendarEventItem } from '../interfaces';

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
