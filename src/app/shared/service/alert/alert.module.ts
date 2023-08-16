import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { MultiAlertsComponent } from './multi-alerts/multi-alerts.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AlertComponent, MultiAlertsComponent],
    exports: [AlertComponent]
})
export class AlertModule { }