import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonType, SharedUiComponentsUiButtonComponent } from '@ytc/shared/ui-components/ui-button';
import { BadgeType, SharedUiComponentsUiBadgeComponent } from '@ytc/shared/ui-components/ui-badge';

@Component({
    selector: 'ytc-shared-ui-components-ui-button-badge',
    standalone: true,
    imports: [CommonModule, SharedUiComponentsUiButtonComponent, SharedUiComponentsUiBadgeComponent],
    templateUrl: './shared-ui-components-ui-button-badge.component.html',
})
export class SharedUiComponentsUiButtonBadgeComponent {
    @Input({ required: true }) public buttonType: ButtonType = 'btn-primary';
    @Input() public badgeType: BadgeType | string = '';
    @Input() public customStyleButton = '';
    @Input() public customStyleBadge = '';

    @Output() public buttonBadgeClick: EventEmitter<void> = new EventEmitter();

    public onClick(): void {
        this.buttonBadgeClick.emit();
    }
}
