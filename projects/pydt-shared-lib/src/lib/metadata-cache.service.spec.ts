import { HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { firstValueFrom, Observable, of } from "rxjs";
import { HashedPydtMetadata, PydtMetadata } from "./_gen/swagger/api";
import { MetadataService } from "./_gen/swagger/api/api/metadata.service";
import { MetadataCacheService } from "./metadata-cache.service";

interface FakeMetadataService {
  metadata: jasmine.Spy<() => Observable<HashedPydtMetadata>>;
}

const buildMetadata = (hash: string): HashedPydtMetadata => ({
  hash,
  metadata: { civGames: [] } as unknown as PydtMetadata,
});

const handlerWithHash = (hash?: string): HttpHandler =>
  ({
    handle: () =>
      of(new HttpResponse({ headers: hash ? new HttpHeaders({ "Metadata-Hash": hash }) : new HttpHeaders() })),
  }) as HttpHandler;

describe("MetadataCacheService", () => {
  let api: FakeMetadataService;
  let service: MetadataCacheService;

  beforeEach(() => {
    api = { metadata: jasmine.createSpy("metadata") };
    service = new MetadataCacheService(api as unknown as MetadataService);
  });

  it("fetches metadata from the API and caches it", async () => {
    api.metadata.and.returnValue(of(buildMetadata("hash-1")));

    const result = await service.getCivGameMetadata();

    expect(result).toEqual({ civGames: [] } as unknown as PydtMetadata);
    expect(api.metadata).toHaveBeenCalledTimes(1);
  });

  it("does not call the API again once cached", async () => {
    api.metadata.and.returnValue(of(buildMetadata("hash-1")));

    await service.getCivGameMetadata();
    await service.getCivGameMetadata();

    expect(api.metadata).toHaveBeenCalledTimes(1);
  });

  it("dedupes concurrent in-flight requests into a single API call", async () => {
    api.metadata.and.returnValue(of(buildMetadata("hash-1")));

    const [first, second] = await Promise.all([service.getCivGameMetadata(), service.getCivGameMetadata()]);

    expect(first).toBe(second);
    expect(api.metadata).toHaveBeenCalledTimes(1);
  });

  it("keeps the cached data when the response's Metadata-Hash header matches", async () => {
    api.metadata.and.returnValue(of(buildMetadata("hash-1")));
    await service.getCivGameMetadata();

    await firstValueFrom(service.intercept(new HttpRequest("GET", "/test"), handlerWithHash("hash-1")));
    await service.getCivGameMetadata();

    expect(api.metadata).toHaveBeenCalledTimes(1);
  });

  it("invalidates the cached data when the response's Metadata-Hash header changes", async () => {
    api.metadata.and.returnValue(of(buildMetadata("hash-1")));
    await service.getCivGameMetadata();

    await firstValueFrom(service.intercept(new HttpRequest("GET", "/test"), handlerWithHash("hash-2")));

    api.metadata.and.returnValue(of(buildMetadata("hash-2")));
    await service.getCivGameMetadata();

    expect(api.metadata).toHaveBeenCalledTimes(2);
  });

  it("does nothing when there is no cached data yet, even with a Metadata-Hash header present", async () => {
    await expectAsync(
      firstValueFrom(service.intercept(new HttpRequest("GET", "/test"), handlerWithHash("hash-1"))),
    ).toBeResolved();

    expect(api.metadata).not.toHaveBeenCalled();
  });

  it("ignores responses without a Metadata-Hash header", async () => {
    api.metadata.and.returnValue(of(buildMetadata("hash-1")));
    await service.getCivGameMetadata();

    await firstValueFrom(service.intercept(new HttpRequest("GET", "/test"), handlerWithHash()));
    await service.getCivGameMetadata();

    expect(api.metadata).toHaveBeenCalledTimes(1);
  });
});
