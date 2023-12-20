// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BACKEND_HOST: 'http://localhost:3001/api',
  BACKEND_AMM: 'http://localhost:3001/api',
  AUTH_ISSUER: 'https://login.agid.gov.it',
  AUTH_CLIENT_ID: '4af1e6aa-15e2-4e22-98b0-cf6520377b52',
  AUTH_DUMMY_CLIENT_SECRET: '78bc23ef-f431-44f3-8544-c59fa0b32634',
  AUTH_BASIC_AUTH: true,
  AUTH_REDIRECT_URI: 'http://localhost',
  AUTH_SCOPE: 'openid profile email offline_access',
  AUTH_RESPONSE_TYPE: 'code',
  AUTH_SHOW_DEBUG_INFORMATION: true,
  AUTH_REQUIRE_HTTPS: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
