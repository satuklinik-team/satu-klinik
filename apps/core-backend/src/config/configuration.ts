export default () => ({
  secrets: {
    sendgrid_key: process.env.SEND_GRID_KEY,
    access_token: process.env.ACCESS_TOKEN_SECRET,
    refresh_token: process.env.REFRESH_TOKEN_SECRET,
  },
  frontend_url: process.env.FRONTEND_PUBLIC_URL,
  max_function_retry: 3,
  environment: process.env.ENVIRONMENT || 'development',
});
