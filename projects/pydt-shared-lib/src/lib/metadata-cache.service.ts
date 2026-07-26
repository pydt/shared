import { Injectable } from "@angular/core";
import { HashedPydtMetadata } from "./_gen/swagger/api";
import { MetadataService } from "./_gen/swagger/api/api/metadata.service";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class MetadataCacheService implements HttpInterceptor {
  private cachedData: HashedPydtMetadata | undefined;
  private dataPromise: Promise<HashedPydtMetadata> | undefined;

  constructor(private api: MetadataService) {}

  async getCivGameMetadata() {
    if (!this.cachedData) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      if (!this.dataPromise) {
        this.dataPromise = firstValueFrom(this.api.metadata());
      }

      try {
        this.cachedData = await this.dataPromise;
      } finally {
        this.dataPromise = undefined;
      }
    }

    return this.cachedData.metadata;
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Invalidate cached data if header changes
          if (
            this.cachedData &&
            event.headers.has("Metadata-Hash") &&
            event.headers.get("Metadata-Hash") !== this.cachedData.hash
          ) {
            this.cachedData = undefined;
          }
        }
      }),
    );
  }
}
