/**
 * An array of route that are accessible to the public
 * They do not require authentication
 * @type{string[]}
 */
export const publicRoutes = [
"/"
];

/**
 * The route used for authentication
 * These routes will redirect logged in users to /settings
 * @type{string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register"
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