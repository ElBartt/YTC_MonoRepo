import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function dashboardGuard() {
    const router = inject(Router);

    if (localStorage.getItem('authKey')) {
        return true;
    } else {
        router.navigate(['/']);
        return false;
    }
}
