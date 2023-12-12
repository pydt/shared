import { countdown } from "../public_api";

export class CountdownUtility {
  public static countdownAgo(start: unknown, end: unknown, max = 2) {
    if (!start) {
      return "never";
    }

    const text = CountdownUtility.countdown(start, end, max);

    if (!text.toString()) {
      return "now";
    }

    return `${text} ago`;
  }

  public static countdown(start: unknown, end: unknown, max = 2) {
    // eslint-disable-next-line no-bitwise
    return countdown(
      start,
      end,
      countdown.YEARS | countdown.MONTHS | countdown.DAYS | countdown.HOURS | countdown.MINUTES,
      max,
      0,
    ) as string;
  }
}
