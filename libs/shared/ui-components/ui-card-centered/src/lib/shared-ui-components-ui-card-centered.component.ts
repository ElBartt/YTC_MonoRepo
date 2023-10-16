import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SharedUiComponentsUiButtonComponent } from '@ytc/shared/ui-components/ui-button';

@Component({
    selector: 'ytc-shared-ui-components-ui-card-centered',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, SharedUiComponentsUiButtonComponent],
    templateUrl: './shared-ui-components-ui-card-centered.component.html',
})
export class SharedUiComponentsUiCardCenteredComponent {
    @Input({ required: true }) public imgUrl!: string;
    @Input({ required: true }) public cardTitle!: string;
    @Input() public subCardTitle = '';
    @Input({ required: true }) public cardBtnText!: string;

    @Output() public clickEvent = new EventEmitter<void>();

    onClick() {
        this.clickEvent.emit();
    }
}
