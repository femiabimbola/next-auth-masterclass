/**
 * An array of route that are accessible to the public
 * They do not require authentication
 * @type{string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * The route used for authentication
 * These routes will redirect logged in users to /settings
 * @type{string[]}
 */
// The auth is only available for logged out users
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
  "/api/admin",
];

/**
 * The prefix for API authentication
 * Routes that start with this prefix are used for API authentication
 * @type{string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect part after logging in
 * @type{string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
