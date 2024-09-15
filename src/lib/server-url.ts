/**
 * This method return the server URL based on the environment.
 */
export const getServerUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // If we are in production, we return the production URL.
  if (process.env.NODE_ENV === "production") {
    return `https://${process.env.PRODUCTION_URL}`;
  }

  // If we are in development, we return the localhost URL.
  return "http://localhost:3000";
};
