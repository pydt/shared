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
import { TurnData } from './turnData';
import { UserTurnData } from './userTurnData';


export interface UsersByGameTypeResponse { 
    global: TurnData;
    users: Array<UserTurnData>;
}
