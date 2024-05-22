export default () => ({
  secrets: {
    sendgrid_key: process.env.SEND_GRID_KEY,
    access_token: process.env.ACCESS_TOKEN_SECRET,
    refresh_token: process.env.REFRESH_TOKEN_SECRET,
  },
  frontend_url: process.env.FRONTEND_PUBLIC_URL,
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
  oauth: {
    access_token: '',
  },
  minio: {
    endpoint: process.env.MINIO_ENDPOINT,
    public_endpoint: process.env.MINIO_PUBLIC_ENDPOINT,
    port: process.env.MINIO_PORT,
    user: process.env.MINIO_USER,
    password: process.env.MINIO_PASSWORD,
    bucket: process.env.MINIO_BUCKET,
  },
});
