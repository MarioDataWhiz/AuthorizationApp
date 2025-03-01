// filepath: /Users/mt/Desktop/web-projects/lab6_2/src/config/asgardeoConfig.js
export const asgardeoConfig = {
  clientID: import.meta.env.VITE_ASGARDEO_CLIENT_ID,
  baseUrl: import.meta.env.VITE_ASGARDEO_BASE_URL,
  signInRedirectURL: import.meta.env.VITE_ASGARDEO_REDIRECT_URL,
  scope: ["openid", "profile"]
};