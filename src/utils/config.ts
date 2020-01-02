/*
    wrapper under config package
    added only auto suggest IDE sugar by interface
 */
import currentConfig from 'config'
export interface Config {
    port: number;
    logging: {
        default: string,
        error: string,
        silly: string
    },
    mongoDB: {
        connectionString: string,
        collection: {
            word: string,
            relation: string
            dictionary: string
        }
    },
    elasticSearch: {
        index: {
            word: string,
            relation: string
        },
        options: {
            node: string,
            log: string,
            keepAlive: boolean
        }
    }
}
export const config: Config = currentConfig as any;
