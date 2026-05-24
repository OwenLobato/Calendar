import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';

type AuthStatus = 'authenticated' | 'not-authenticated';

/**
 * TODO: Replace with a real store/context selector when auth is implemented.
 * Returns the current authentication status of the user.
 */
const getAuthStatus = (): AuthStatus => 'authenticated';

export const AppRouter = () => {
  const authStatus = getAuthStatus();

  return (
    <Routes>
      {authStatus === 'not-authenticated' ? (
        <Route path='/auth/*' element={<LoginPage />} />
      ) : (
        <Route path='/*' element={<CalendarPage />} />
      )}

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
