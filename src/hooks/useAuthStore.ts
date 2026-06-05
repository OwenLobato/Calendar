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

interface AuthResponse {
  ok: boolean;
  uid: string;
  name: string;
  token: string;
}

interface ApiError {
  ok: boolean;
  msg: string;
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
      const { data } = await calendarApi.post<AuthResponse>('/auth', {
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
      const { data } = await calendarApi.post<AuthResponse>('/auth/new', {
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
    dispatch(onLogout());
  };

  const checkAuthToken = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(onLogout());
      return;
    }

    try {
      const { data } = await calendarApi.get<AuthResponse>('/auth/revalidate');
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
