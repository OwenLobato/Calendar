import { useDispatch, useSelector } from 'react-redux';
import { isAxiosError } from 'axios';
import {
  onChecking,
  onLogin,
  onLogout,
  onLogutCalendar,
  clearErrorMsg,
  type RootState,
} from '../store';
import { calendarApi, type ApiError } from '../api';
import {
  type LoginCredentials,
  type RegisterCredentials,
  type AuthApiResponse,
} from '../auth/interfaces';

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
      const { data } = await calendarApi.post<AuthApiResponse>('/auth', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log({ error });
      let errorMsg = 'Credenciales no válidas';
      if (isAxiosError<ApiError>(error)) {
        errorMsg = error.response?.data?.msg || errorMsg;
      }
      dispatch(onLogout(errorMsg));
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
      const { data } = await calendarApi.post<AuthApiResponse>('/auth/new', {
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
      if (isAxiosError<ApiError>(error)) {
        errorMsg = error.response?.data?.msg || errorMsg;
      }
      dispatch(onLogout(errorMsg));
      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 10);
    }
  };

  const startLogout = async (): Promise<void> => {
    localStorage.clear();
    dispatch(onLogutCalendar());
    dispatch(onLogout());
  };

  const checkAuthToken = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(onLogout());
      return;
    }

    try {
      const { data } =
        await calendarApi.get<AuthApiResponse>('/auth/revalidate');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log({ error });

      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    startLogout,
    checkAuthToken,
  };
};
