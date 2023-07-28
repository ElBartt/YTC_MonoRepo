import { Routes } from '@angular/router';
import { dashboardGuard } from './dashboard/dashboard.guard';

export const ROUTES: Routes = [
    { path: '', loadComponent: () => import('./homepage/homepage.component').then(mod => mod.HomepageComponent) },
    {
        path: 'dashboard',
        canActivate: [dashboardGuard],
        loadComponent: () => import('./dashboard/dashboard.component').then(mod => mod.DashboardComponent),
    },
    { path: '**', redirectTo: '' },
];
