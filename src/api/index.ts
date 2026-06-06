export { default as calendarApi } from './calendarApi';

/** Error response body returned by every backend endpoint on failure */
export interface ApiError {
  ok: boolean;
  msg: string;
}
