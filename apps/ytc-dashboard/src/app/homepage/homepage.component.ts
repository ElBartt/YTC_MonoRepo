import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ytc-homepage',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
    private readonly supabaseService = inject(SupabaseService);
    private readonly router = inject(Router);

    public ngOnInit(): void {
        if (localStorage.getItem('authKey')) {
            this.router.navigate(['/dashboard']);
        }
    }

    public goClicked(value: string): void {
        this.supabaseService.getAuthKey(value).subscribe(authKey => {
            if (authKey.key && authKey.key.length > 0) {
                localStorage.setItem('authKey', authKey.key);
                this.router.navigate(['/dashboard']);
            }
        });
    }
}
