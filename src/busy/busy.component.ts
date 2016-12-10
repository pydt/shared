/**
 * @file Component: Busy
 * @author yumao<yuzhang.lille@gmail.com>
 */

import { Component } from '@angular/core';
import { PromiseTrackerService } from './promise-tracker.service';

export interface IBusyContext {
    message: string;
};

@Component({
    selector: 'pydt-busy',
    template: `
        <div [class]="wrapperClass" *ngIf="isActive()">
            <div class="pydt-spinner"></div>
        </div>
    `
})
export class BusyComponent {
    message: string;
    wrapperClass: string;
    context: IBusyContext = {
        message: null
    };

    constructor(private tracker: PromiseTrackerService) {
    }

    isActive() {
        return this.tracker.isActive();
    }
}
