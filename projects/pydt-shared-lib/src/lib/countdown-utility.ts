import { map, timer } from "rxjs";
import { Game, countdown } from "../public_api";

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

  public static lastTurnOrTimerExpires$(game: Game) {
    if (game.turnTimerMinutes) {
      return this.timerExpires$(game);
    }

    return this.lastTurn$(game);
  }

  public static lastTurn$(game: Game) {
    return timer(0, 1000).pipe(
      map(() => {
        const lastTurnDate = game.lastTurnEndDate || game.updatedAt;

        return `Last turn ${CountdownUtility.countdownAgo(lastTurnDate, new Date())}`;
      }),
    );
  }

  public static timerExpires$(game: Game) {
    return timer(0, 1000).pipe(
      map(() => {
        const now = new Date();
        const lastTurnDate = game.lastTurnEndDate || game.updatedAt;
        const expirationDate = new Date(lastTurnDate.getTime() + game.turnTimerMinutes * 60 * 1000);

        if (expirationDate.getTime() - now.getTime() < 0) {
          return "Timer expires soon...";
        }

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `Timer expires in ${CountdownUtility.countdown(now, expirationDate)}`;
      }),
    );
  }
}
