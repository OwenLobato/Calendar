import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = (): void => {
    startDeletingEvent();
  };

  return (
    <button
      className='btn btn-danger fab-danger'
      onClick={handleDelete}
      style={{
        display: hasEventSelected ? undefined : 'none',
      }}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  );
};
