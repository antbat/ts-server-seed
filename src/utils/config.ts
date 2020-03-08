/*
    wrapper under config package
    added only auto suggest IDE sugar by interface
 */

import { ILoggerConfig } from '@antbat/ts-logger-es';
import currentConfig from 'config';

export interface Config {
    port: number;
    logging: ILoggerConfig;
    mongoDB: {
        connectionString: string;
        collection: {
            user: string;
        };
    };
    elasticSearch: {
        index: {
            user: string;
        };
        options: {
            node: string;
            log: string;
            keepAlive: boolean;
        };
    };
}
export const config: Config = currentConfig as any;
