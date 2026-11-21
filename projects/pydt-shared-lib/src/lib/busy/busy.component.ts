import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit, ChangeDetectionStrategy, inject } from "@angular/core";
import { BusyService } from "./busy.service";

@Component({
  selector: "pydt-busy",
  animations: [
    trigger("visibilityChanged", [
      state("shown", style({ opacity: 1, display: "block" })),
      state("hidden", style({ opacity: 0, display: "none" })),
      transition("* => *", animate(".2s")),
    ]),
  ],
  template: ` <div [@visibilityChanged]="busyValue ? 'shown' : 'hidden'" class="pydt-busy backdrop">
    <div class="pydt-busy spinner"></div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class BusyComponent implements OnInit {
  private busyService = inject(BusyService);

  public busyValue = false;

  public ngOnInit() {
    this.busyService.subscribeBusy(isBusy => {
      this.busyValue = isBusy;
    });
  }
}
