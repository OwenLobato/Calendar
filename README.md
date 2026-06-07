# CalendarApp

A collaborative calendar application with JWT authentication. Users can create, edit, and delete events on a shared calendar — each event is tied to its author and color-coded so you can instantly tell whose is whose.

## Features

- JWT authentication — login, register, and automatic token renewal
- Full CRUD for calendar events against a REST API
- Interactive calendar with month, week, and day views
- Own events highlighted in blue; other users' events in gray
- Last selected view persisted in `localStorage`
- Fully localized in Spanish

## Tech stack

| Layer | Technology |
|-------|-----------|
| UI | React 19 + TypeScript |
| State | Redux Toolkit |
| Routing | React Router v6 |
| Calendar | react-big-calendar + date-fns |
| Modal / dates | react-modal + react-datepicker |
| HTTP | Axios |
| Alerts | SweetAlert2 |
| Build | Vite 8 + React Compiler |

## Requirements

- Node.js 22.19.0 (see [.nvmrc](.nvmrc))
- The course backend running locally or deployed (see [Environment variables](#environment-variables))

If you use nvm, run `nvm use` in the project root to switch to the right version automatically.

## Installation

```bash
npm install
```

## Environment variables

Copy the template and fill in the API URL:

```bash
cp .env.template .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL of the calendar REST API | `http://localhost:4000` |

The backend for this project is a Node/Express + MongoDB API that provides `/api/auth` and `/api/events` endpoints. If you don't have it running locally, point `VITE_API_URL` to a deployed instance.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview the production build locally
```

## Project structure

```
src/
  CalendarApp.tsx              # Root component — BrowserRouter + AppRouter
  main.tsx                     # Entry point (StrictMode disabled for React Compiler)
  router/                      # AppRouter: route definitions + auth guard
  auth/                        # LoginPage — login and register forms
  calendar/
    pages/CalendarPage.tsx     # Main view: calendar + modal + floating action buttons
    components/
      CalendarModal.tsx        # Create / edit event modal
      CalendarEvent.tsx        # Custom event renderer
      FabAddNew.tsx            # Floating button to add an event
      FabDelete.tsx            # Floating button to delete the selected event
      Navbar.tsx               # Top bar with logout
  store/                       # Redux slices: auth, calendar, ui
  hooks/                       # useAuthStore, useCalendarStore, useUiStore, useForm
  helpers/                     # date-fns localizer, Spanish messages, date converters
  api/                         # Axios instance with JWT request interceptor
```

## Notes

- Bootstrap utility classes and Font Awesome icons are loaded from CDN in `index.html` — no npm packages for either.
- The React Compiler (`babel-plugin-react-compiler`) is enabled via `@rolldown/plugin-babel`. `StrictMode` is intentionally disabled because of this.

## Credits

Built as part of the **[React: De Cero a Experto (Hooks y MERN)](https://www.udemy.com/course/react-cero-experto)** course by [Fernando Herrera](https://github.com/Klerith) — [DevTalles](https://devtalles.com).
