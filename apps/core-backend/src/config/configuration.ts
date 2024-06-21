export default () => ({
  secrets: {
    sendgrid_key: process.env.SEND_GRID_KEY,
    access_token: process.env.ACCESS_TOKEN_SECRET,
    refresh_token: process.env.REFRESH_TOKEN_SECRET,
  },
  frontend_url: process.env.FRONTEND_PUBLIC_URL,
  backend_url: process.env.BACKEND_URL,
  max_function_retry: 3,
  environment: process.env.ENVIRONMENT || 'development',
  satu_sehat: {
    url: process.env.SATU_SEHAT_URL,
    organization_id: process.env.SATU_SEHAT_ORGANIZATION_ID,
    auth_url: process.env.SATU_SEHAT_AUTH_URL,
    kfa_url: process.env.SATU_SEHAT_KFA_URL,
  },
  http: {
    timeout: 5000,
    max_redirects: 5,
  },
  minio: {
    endpoint: process.env.MINIO_ENDPOINT,
    public_endpoint: process.env.MINIO_PUBLIC_ENDPOINT,
    port: process.env.MINIO_PORT,
    user: process.env.MINIO_USER,
    password: process.env.MINIO_PASSWORD,
    bucket: process.env.MINIO_BUCKET,
  },
  email: {
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    send_grid_key: process.env.SEND_GRID_KEY,
    debug_email: process.env.DEBUG_EMAIL,
  },
});
