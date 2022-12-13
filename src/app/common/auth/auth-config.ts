import { AuthConfig } from 'angular-oauth2-oidc';
import { environment as ENV } from 'src/environments/environment';

export const authConfig: AuthConfig = {
  issuer: ENV.AUTH_ISSUER,
  clientId: ENV.AUTH_CLIENT_ID,
  dummyClientSecret: ENV.AUTH_DUMMY_CLIENT_SECRET,
  useHttpBasicAuth: ENV.AUTH_BASIC_AUTH,
  redirectUri: ENV.AUTH_REDIRECT_URI,
  scope: ENV.AUTH_SCOPE,
  responseType: ENV.AUTH_RESPONSE_TYPE,
  showDebugInformation: ENV.AUTH_SHOW_DEBUG_INFORMATION,
  requireHttps: ENV.AUTH_REQUIRE_HTTPS,
};
