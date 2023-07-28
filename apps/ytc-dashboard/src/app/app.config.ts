import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(ROUTES), { provide: LocationStrategy, useClass: HashLocationStrategy }],
};
