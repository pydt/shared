import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class BusyService {
    private busyLevel = 0;
    private busyStream = new Subject<boolean>();

    public incrementBusy(isMoBizzay: boolean) {
        this.busyLevel += isMoBizzay ? 1 : -1;
        this.busyStream.next(this.busyLevel > 0);
    }

    public subscribeBusy(callback: (value: boolean) => void) {
        return this.busyStream.subscribe(callback);
    }
}
