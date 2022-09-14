import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://login-test.agid.gov.it',
  clientId: '4af1e6aa-15e2-4e22-98b0-cf6520377b52',
  dummyClientSecret: '78bc23ef-f431-44f3-8544-c59fa0b32634',
  useHttpBasicAuth: true,
  redirectUri: 'http://localhost',
  scope: 'openid profile email offline_access',
  responseType: 'code',
  showDebugInformation: true,
};
