import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, inject } from '@angular/core';
import { initKeycloak } from './init-keycloak';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
 
//Due to a bug, this 'const intercept' is needed to add the Bearer-token in HTTP-requests.
export const intercept: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
	const keycloak:KeycloakService = inject(KeycloakService);
	const instance = keycloak.getKeycloakInstance();

	if(keycloak.isLoggedIn()) {
		req = req.clone({
			setHeaders: {
				Authorization: `Bearer ${instance.token}`
			}
		});
	}
	
	return next(req);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
		provideHttpClient(
			withInterceptors([intercept]),
			withInterceptorsFromDi()
		),
		{
			provide: APP_INITIALIZER,
			useFactory: initKeycloak,
			multi: true,
			deps: [KeycloakService]
		},
		KeycloakService,
  ]
};