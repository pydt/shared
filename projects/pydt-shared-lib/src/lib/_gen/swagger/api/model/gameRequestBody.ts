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


export interface GameRequestBody { 
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
    randomOnly?: GameRequestBody.RandomOnlyEnum;
    allowJoinAfterStart?: boolean;
    turnTimerMinutes?: number;
    password?: string;
}
export namespace GameRequestBody {
    export type RandomOnlyEnum = 'EITHER' | 'FORCE_RANDOM' | 'FORCE_LEADER';
    export const RandomOnlyEnum = {
        EITHER: 'EITHER' as RandomOnlyEnum,
        FORCERANDOM: 'FORCE_RANDOM' as RandomOnlyEnum,
        FORCELEADER: 'FORCE_LEADER' as RandomOnlyEnum
    };
}
