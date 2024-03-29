/**
 * serverless-api
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { GAMEFLAG } from './gAMEFLAG';
import { GamePlayer } from './gamePlayer';
import { RecordNumberNumber_ } from './recordNumberNumber_';


export interface OpenSlotsGame { 
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
    gameSpeed?: string;
    mapFile?: string;
    mapSize?: string;
    gameType: string;
    displayName: string;
    description?: string;
    webhookUrl?: string;
    dlc: Array<string>;
    slots: number;
    humans: number;
    allowDuplicateLeaders?: boolean;
    randomOnly?: OpenSlotsGame.RandomOnlyEnum;
    allowJoinAfterStart?: boolean;
    turnTimerMinutes?: number;
    turnTimerVacationHandling?: OpenSlotsGame.TurnTimerVacationHandlingEnum;
    firstTurnEndDate?: Date;
    lastTurnEndDate?: Date;
    turnsPlayed?: number;
    turnsSkipped?: number;
    timeTaken?: number;
    fastTurns?: number;
    slowTurns?: number;
    hourOfDayQueue?: string;
    dayOfWeekQueue?: string;
    turnLengthBuckets?: RecordNumberNumber_;
    yearBuckets?: RecordNumberNumber_;
    gameId: string;
    createdBySteamId: string;
    inProgress?: boolean;
    hashedPassword?: string;
    players: Array<GamePlayer>;
    discourseTopicId?: number;
    clonedFromGameId?: string;
    currentPlayerSteamId: string;
    round?: number;
    gameTurnRangeKey?: number;
    completed?: boolean;
    latestDiscoursePostNumber?: number;
    latestDiscoursePostUser?: string;
    resetGameStateOnNextUpload?: boolean;
    finalized?: boolean;
    gameVideoUrl?: string;
    dataVersion?: number;
    flags?: Array<GAMEFLAG>;
    joinAfterStart: boolean;
    substitutionRequested: boolean;
}
export namespace OpenSlotsGame {
    export type RandomOnlyEnum = 'EITHER' | 'FORCE_RANDOM' | 'FORCE_LEADER';
    export const RandomOnlyEnum = {
        EITHER: 'EITHER' as RandomOnlyEnum,
        FORCERANDOM: 'FORCE_RANDOM' as RandomOnlyEnum,
        FORCELEADER: 'FORCE_LEADER' as RandomOnlyEnum
    };
    export type TurnTimerVacationHandlingEnum = 'PAUSE' | 'SKIP_AFTER_TIMER' | 'SKIP_IMMEDIATELY';
    export const TurnTimerVacationHandlingEnum = {
        PAUSE: 'PAUSE' as TurnTimerVacationHandlingEnum,
        SKIPAFTERTIMER: 'SKIP_AFTER_TIMER' as TurnTimerVacationHandlingEnum,
        SKIPIMMEDIATELY: 'SKIP_IMMEDIATELY' as TurnTimerVacationHandlingEnum
    };
}
