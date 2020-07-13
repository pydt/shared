import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class BusyService implements HttpInterceptor {
    private busyLevel = 0;
    private busyStream = new Subject<boolean>();

    public incrementBusy(isMoBizzay: boolean) {
        this.busyLevel += isMoBizzay ? 1 : -1;
        this.busyStream.next(this.busyLevel > 0);
    }

    public subscribeBusy(callback: (value: boolean) => void): Subscription {
        return this.busyStream.subscribe(callback);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.incrementBusy(true);

        return next.handle(req).pipe(finalize(() => {
            this.incrementBusy(false);
        }));
    }
}
