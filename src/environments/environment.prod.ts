export const environment = {
  production: true,
  BACKEND_HOST: '/api',
  BACKEND_AMM: 'https://indicepa.gov.it/ipa-dati/api',
  AUTH_ISSUER: 'https://login-test.agid.gov.it',
  AUTH_CLIENT_ID: '4af1e6aa-15e2-4e22-98b0-cf6520377b52',
  AUTH_DUMMY_CLIENT_SECRET: '78bc23ef-f431-44f3-8544-c59fa0b32634',
  AUTH_BASIC_AUTH: true,
  AUTH_REDIRECT_URI: 'https://va-form.agid.gov.it/',
  AUTH_SCOPE: 'openid profile email offline_access',
  AUTH_RESPONSE_TYPE: 'code',
  AUTH_SHOW_DEBUG_INFORMATION: true,
};
