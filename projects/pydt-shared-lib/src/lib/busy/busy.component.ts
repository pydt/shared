import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { BusyService } from './busy.service';

@Component({
  selector: 'pydt-busy',
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1, display: 'block' })),
      state('hidden', style({ opacity: 0, display: 'none' })),
      transition('* => *', animate('.2s'))
    ])
  ],
  template: `
  <div [@visibilityChanged]="busyValue ? 'shown' : 'hidden'" class="pydt-busy backdrop">
    <div class="pydt-busy spinner"></div>
  </div>`
})
export class BusyComponent implements OnInit {
    public busyValue = false;

    constructor(private busyService: BusyService) {
    }

    public ngOnInit() {
        this.busyService.subscribeBusy(isBusy => {
            this.busyValue = isBusy;
        });
    }
}
