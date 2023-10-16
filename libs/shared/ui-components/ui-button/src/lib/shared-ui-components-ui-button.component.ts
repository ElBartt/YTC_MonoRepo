import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonType } from './models/button.type';

@Component({
    selector: 'ytc-shared-ui-components-ui-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './shared-ui-components-ui-button.component.html',
})
export class SharedUiComponentsUiButtonComponent {
    @Input({ required: true }) public buttonType: ButtonType = 'btn-primary';
    @Input() public customStyle = '';

    @Output() public buttonClick: EventEmitter<void> = new EventEmitter<void>();

    onClick(): void {
        this.buttonClick.emit();
    }
}
