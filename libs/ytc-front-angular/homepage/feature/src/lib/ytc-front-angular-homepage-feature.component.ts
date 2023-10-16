import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiComponentsUiButtonComponent } from '@ytc/shared/ui-components/ui-button';
import { SharedUiComponentsUiBadgeComponent } from '@ytc/shared/ui-components/ui-badge';
import { SharedUiComponentsUiButtonBadgeComponent } from '@ytc/shared/ui-components/ui-button-badge';
import { SharedUiComponentsUiCardComponent } from '@ytc/shared/ui-components/ui-card';
import { SharedUiComponentsUiCardCenteredComponent } from '../../../../../shared/ui-components/ui-card-centered/src/lib/shared-ui-components-ui-card-centered.component';

@Component({
    selector: 'ytc-ytc-front-angular-homepage-feature',
    standalone: true,
    imports: [
        CommonModule,
        SharedUiComponentsUiButtonComponent,
        SharedUiComponentsUiBadgeComponent,
        SharedUiComponentsUiButtonBadgeComponent,
        SharedUiComponentsUiCardComponent,
        SharedUiComponentsUiCardCenteredComponent,
    ],
    templateUrl: './ytc-front-angular-homepage-feature.component.html',
})
export class YtcFrontAngularHomepageFeatureComponent {}
