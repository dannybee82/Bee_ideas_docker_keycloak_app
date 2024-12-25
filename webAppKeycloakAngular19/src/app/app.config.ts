import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { createInterceptorCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, IncludeBearerTokenCondition, includeBearerTokenInterceptor, provideKeycloak, withAutoRefreshToken } from 'keycloak-angular';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

//Settings for Bearer token interceptor
const bearerTokenInterceptor = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: new RegExp(`^${environment.userEndpoint}(.*)?$`, "i"),
  bearerPrefix: 'Bearer'
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(
      withInterceptors([includeBearerTokenInterceptor])
    ),
    provideAnimationsAsync(),
    provideKeycloak({
      config: {
        url: `${environment.keycloakServer}`,
        realm: `${environment.keycloakRealm}`,
        clientId: `${environment.keycloakCLientId}`,
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false
      },
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: 'login',
          sessionTimeout: 300000
        })
      ]
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [bearerTokenInterceptor]
    },
  ]
};