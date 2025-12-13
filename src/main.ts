import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    provideHttpClient(
      // Optionally add interceptors (for JWT, logging, etc.)
      withInterceptors([])
    ),
    ...(appConfig.providers || []), // keep existing appConfig providers
  ],
})
  .catch((err) => console.error(err));
