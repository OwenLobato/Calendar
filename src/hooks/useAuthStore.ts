import { useDispatch, useSelector } from 'react-redux';
import { isAxiosError } from 'axios';
import {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMsg,
  type RootState,
} from '../store';
import { calendarApi } from '../api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();

  const startLogin = async ({
    email,
    password,
  }: LoginCredentials): Promise<void> => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth', { email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout('Invalid credentials'));
      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 10);
    }
  };

  const startRegister = async ({
    name,
    email,
    password,
  }: RegisterCredentials): Promise<void> => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log({ error });
      let errorMsg = 'Error registrando usuario';
      if (isAxiosError(error)) {
        errorMsg = error.response?.data?.msg || errorMsg;
      }
      dispatch(onLogout(errorMsg));
      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 10);
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
  };
};
