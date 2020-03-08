import { createCustomLogger } from '@antbat/ts-logger-es';
import { client } from '../connections/elasticSearch.connection';
import { config } from './config';

export const getLogger = createCustomLogger(config.logging, client);
