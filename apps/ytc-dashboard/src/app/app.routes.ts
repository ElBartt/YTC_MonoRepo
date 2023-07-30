import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('@ytc/ytc-dashboard/feature-shell').then(m => m.featureShellRoutes),
    },
];
