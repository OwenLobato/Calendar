/** Request body for POST /api/auth */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Request body for POST /api/auth/new */
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

/**
 * Success response body for all auth endpoints:
 *   POST /api/auth        (login)
 *   POST /api/auth/new    (register)
 *   GET  /api/auth/revalidate
 */
export interface AuthApiResponse {
  ok: boolean;
  uid: string;
  name: string;
  token: string;
}
