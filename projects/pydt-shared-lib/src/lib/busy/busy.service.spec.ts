import { HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { of } from "rxjs";
import { BusyService } from "./busy.service";

describe("BusyService", () => {
  let service: BusyService;

  beforeEach(() => {
    service = new BusyService();
  });

  const passthroughHandler: HttpHandler = {
    handle: () => of(new HttpResponse()),
  } as HttpHandler;

  it("notifies subscribers as busy count goes above and back to zero", () => {
    const values: boolean[] = [];

    service.subscribeBusy(value => values.push(value));

    service.incrementBusy(true);
    service.incrementBusy(true);
    service.incrementBusy(false);
    service.incrementBusy(false);

    expect(values).toEqual([true, true, true, false]);
  });

  it("stays busy while any nested request is still outstanding", () => {
    const values: boolean[] = [];

    service.subscribeBusy(value => values.push(value));

    service.incrementBusy(true);
    service.incrementBusy(true);
    service.incrementBusy(false);

    expect(values).toEqual([true, true, true]);
  });

  it("marks busy for the duration of an intercepted request", () => {
    const values: boolean[] = [];

    service.subscribeBusy(value => values.push(value));

    service.intercept(new HttpRequest("GET", "/test"), passthroughHandler).subscribe();

    expect(values).toEqual([true, false]);
  });

  it("skips busy tracking for a request when ignoreNextIntercept is set, then resets the flag", () => {
    const values: boolean[] = [];

    service.subscribeBusy(value => values.push(value));
    service.ignoreNextIntercept = true;

    service.intercept(new HttpRequest("GET", "/test"), passthroughHandler).subscribe();

    expect(values).toEqual([]);
    expect(service.ignoreNextIntercept).toBe(false);
  });
});
