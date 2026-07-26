import { HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { of } from "rxjs";
import { DateInterceptor } from "./date-interceptor.service";

describe("DateInterceptor", () => {
  let interceptor: DateInterceptor;

  beforeEach(() => {
    interceptor = new DateInterceptor();
  });

  const handlerReturning = (body: unknown): HttpHandler =>
    ({
      handle: () => of(new HttpResponse({ body })),
    }) as HttpHandler;

  const intercept = <T>(body: T): Promise<T> =>
    new Promise(resolve => {
      interceptor.intercept(new HttpRequest("GET", "/test"), handlerReturning(body)).subscribe(event => {
        if (event instanceof HttpResponse) {
          resolve(event.body as T);
        }
      });
    });

  it("converts top-level keys ending in 'At' or 'Date' from strings to Dates", async () => {
    const body = await intercept<{ createdAt: string | Date; displayName: string }>({
      createdAt: "2024-01-01T00:00:00.000Z",
      displayName: "My Game",
    });

    expect(body.createdAt).toEqual(new Date("2024-01-01T00:00:00.000Z"));
    expect(body.displayName).toBe("My Game");
  });

  it("recurses into nested objects", async () => {
    const body = await intercept<{ game: { lastTurnEndDate: string | Date } }>({
      game: { lastTurnEndDate: "2024-02-02T00:00:00.000Z" },
    });

    expect(body.game.lastTurnEndDate).toEqual(new Date("2024-02-02T00:00:00.000Z"));
  });

  it("recurses into arrays of objects", async () => {
    const body = await intercept<{ players: { firstTurnEndDate: string | Date }[] }>({
      players: [{ firstTurnEndDate: "2024-03-03T00:00:00.000Z" }, { firstTurnEndDate: "2024-03-04T00:00:00.000Z" }],
    });

    expect(body.players[0].firstTurnEndDate).toEqual(new Date("2024-03-03T00:00:00.000Z"));
    expect(body.players[1].firstTurnEndDate).toEqual(new Date("2024-03-04T00:00:00.000Z"));
  });

  it("recurses into a top-level array response body", async () => {
    const body = await intercept<{ firstTurnEndDate: string | Date }[]>([
      { firstTurnEndDate: "2024-03-03T00:00:00.000Z" },
      { firstTurnEndDate: "2024-03-04T00:00:00.000Z" },
    ]);

    expect(body[0].firstTurnEndDate).toEqual(new Date("2024-03-03T00:00:00.000Z"));
    expect(body[1].firstTurnEndDate).toEqual(new Date("2024-03-04T00:00:00.000Z"));
  });

  it("does not touch string fields that don't end in 'At' or 'Date'", async () => {
    const body = await intercept({ dataVersion: "not-a-date" });

    expect(body.dataVersion).toBe("not-a-date");
  });

  it("does not throw for a null body", async () => {
    const body = await intercept(null);

    expect(body).toBeNull();
  });
});
