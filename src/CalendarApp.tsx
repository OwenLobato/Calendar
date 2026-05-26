import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { Provider } from 'react-redux';
import { store } from './store';

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};
