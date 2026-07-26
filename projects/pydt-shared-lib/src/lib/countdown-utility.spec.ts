import { CountdownUtility } from "./countdown-utility";

describe("CountdownUtility", () => {
  describe("countdownAgo", () => {
    it("returns 'never' when there is no start date", () => {
      expect(CountdownUtility.countdownAgo(null, new Date())).toBe("never");
      expect(CountdownUtility.countdownAgo(undefined, new Date())).toBe("never");
    });

    it("returns 'now' when start and end are the same instant", () => {
      const now = new Date();

      expect(CountdownUtility.countdownAgo(now, now)).toBe("now");
    });

    it("appends 'ago' to the countdown text when there is a meaningful gap", () => {
      const end = new Date("2024-01-10T00:00:00.000Z");
      const start = new Date("2024-01-05T00:00:00.000Z");

      expect(CountdownUtility.countdownAgo(start, end)).toBe("5 days ago");
    });
  });

  describe("countdown", () => {
    it("formats a multi-unit gap using up to `max` units", () => {
      const start = new Date("2024-01-01T00:00:00.000Z");
      const end = new Date("2024-01-03T02:00:00.000Z");

      expect(CountdownUtility.countdown(start, end)).toBe("2 days and 2 hours");
    });

    it("respects a smaller `max` by truncating to the largest units", () => {
      const start = new Date("2024-01-01T00:00:00.000Z");
      const end = new Date("2024-01-03T02:00:00.000Z");

      expect(CountdownUtility.countdown(start, end, 1)).toBe("2 days");
    });
  });
});
