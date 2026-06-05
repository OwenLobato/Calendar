import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { calendarApi } from '../api';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth,
  );

  const startLogin = async ({
    email,
    password,
  }: LoginCredentials): Promise<void> => {
    try {
      const res = await calendarApi.post('/auth', { email, password });
      console.log({ res });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
  };
};
