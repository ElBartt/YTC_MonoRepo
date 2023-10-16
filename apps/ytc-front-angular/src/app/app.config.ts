import { ApplicationConfig } from '@angular/core';
import { ROUTES } from '@ytc/ytc-front-angular/homepage/feature-shell';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(ROUTES, withEnabledBlockingInitialNavigation())],
};
