import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = (): void => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = (): void => {
    dispatch(onCloseDateModal());
  };

  const toggleDateModal = (): void => {
    return isDateModalOpen ? closeDateModal() : openDateModal();
  };

  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
