import { Route, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthKeyService } from '@ytc/ytc-dashboard/homepage/data-access';
import { CommentsService } from '@ytc/ytc-dashboard/labeling/data-access';

export const featureShellRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('@ytc/ytc-dashboard/homepage/feature').then(m => m.HomepageComponent),
        providers: [AuthKeyService],
    },
    {
        path: 'dashboard',
        loadComponent: () => import('@ytc/ytc-dashboard/labeling/feature').then(m => m.LabelingDashboardComponent),
        providers: [CommentsService],
        canActivate: [
            () => {
                const router = inject(Router);

                if (localStorage.getItem('authKey')) {
                    return true;
                } else {
                    router.navigate(['/']);
                    return false;
                }
            },
        ],
    },
    { path: '**', redirectTo: '' },
];
