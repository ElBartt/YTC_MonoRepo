import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthKeyService } from '@ytc/ytc-dashboard/homepage/data-access';

@Component({
    selector: 'ytc-dashboard-homepage',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
    private readonly authKeyService = inject(AuthKeyService);
    private readonly router = inject(Router);

    public ngOnInit(): void {
        if (localStorage.getItem('authKey')) {
            this.router.navigate(['/dashboard']);
        }
    }

    public goClicked(value: string): void {
        this.authKeyService.getAuthKey(value).subscribe(authKey => {
            if (authKey.key && authKey.key.length > 0) {
                localStorage.setItem('authKey', authKey.key);
                this.router.navigate(['/dashboard']);
            }
        });
    }
}
