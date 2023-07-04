import { Pipe, PipeTransform } from "@angular/core";
import { CivGame, Game, ModelMap } from "./_gen/swagger/api";

const getGameDef = (game: Game, games: CivGame[]) => games.find(g => g.id === game.gameType);

export const RANDOM_ONLY_OPTIONS = [
  {
    key: "EITHER",
    label: "Any Leader or Random",
  },
  {
    key: "FORCE_LEADER",
    label: "A Leader must be selected",
  },
  {
    key: "FORCE_RANDOM",
    label: "Random Only",
  },
];

export const TURN_TIMER_VACATION_OPTIONS = [
  {
    key: "SKIP_AFTER_TIMER",
    label: "Turn is skipped at end of timer",
  },
  {
    key: "SKIP_IMMEDIATELY",
    label: "Turn is skipped immediately",
  },
  {
    key: "PAUSE",
    label: "Game is paused while users are on vacation",
  },
];

@Pipe({ name: "gamespeed" })
export class GameSpeedPipe implements PipeTransform {
  transform(game: Game, games: CivGame[]): string {
    if (!games) {
      return "";
    }

    const speed = getGameDef(game, games).gameSpeeds.find(s => s.key === game.gameSpeed);

    return speed ? speed.displayName : "Other / Custom Speed";
  }
}

@Pipe({ name: "map" })
export class MapPipe implements PipeTransform {
  transform(game: Game, games: CivGame[]): string {
    if (!games) {
      return "";
    }

    const map = getGameDef(game, games).maps.find((m: ModelMap) => m.file === game.mapFile) as ModelMap;

    return map ? map.displayName : "Other / Custom Map";
  }
}

@Pipe({ name: "mapsize" })
export class MapSizePipe implements PipeTransform {
  transform(game: Game, games: CivGame[]): string {
    if (!games) {
      return "";
    }

    const size = getGameDef(game, games).mapSizes.find(s => s.key === game.mapSize);

    return size ? size.displayName : "Other / Custom Size";
  }
}

@Pipe({ name: "randomOnly" })
export class RandomOnlyPipe implements PipeTransform {
  transform(game: Game): string {
    return RANDOM_ONLY_OPTIONS.find(x => x.key === game.randomOnly)?.label || RANDOM_ONLY_OPTIONS[0].label;
  }
}

@Pipe({ name: "turnTimerVacation" })
export class TurnTimerVacationPipe implements PipeTransform {
  transform(game: Game): string {
    return (
      TURN_TIMER_VACATION_OPTIONS.find(x => x.key === game.turnTimerVacationHandling)?.label ||
      TURN_TIMER_VACATION_OPTIONS[0].label
    );
  }
}
