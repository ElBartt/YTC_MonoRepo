import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeType } from './models/badge.type';

@Component({
    selector: 'ytc-shared-ui-components-ui-badge',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './shared-ui-components-ui-badge.component.html',
})
export class SharedUiComponentsUiBadgeComponent {
    @Input() badgeType: BadgeType | string = '';
    @Input() customStyle = '';
}
