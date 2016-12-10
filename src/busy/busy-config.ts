/**
 * @file Busy Config
 * @author yumao<yuzhang.lille@gmail.com>
 */

import {Subscription} from 'rxjs/Subscription';

export const BUSY_CONFIG_DEFAULTS = {
    delay: 0,
    minDuration: 0,
    backdrop: true,
    message: 'Please wait...',
    wrapperClass: 'pydt-busy'
};

export class BusyConfig implements IBusyConfig {
    delay: number;
    minDuration: number;
    backdrop: boolean;
    message: string;
    wrapperClass: string;

    constructor(config: IBusyConfig = {}) {
        for (let option in BUSY_CONFIG_DEFAULTS) {
            if (config[option] != null) {
                this[option] = config[option];
            } else {
                this[option] = BUSY_CONFIG_DEFAULTS[option];
            }
        }
    }
}

export interface IBusyConfig {
    delay?: number;
    minDuration?: number;
    backdrop?: boolean;
    message?: string;
    wrapperClass?: string;
    busy?: Promise<any> | Subscription | Array<Promise<any> | Subscription>;
}
