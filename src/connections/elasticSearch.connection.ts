import { Client } from '@elastic/elasticsearch';
import { config } from '../utils/config';

export const client = new Client(config.elasticSearch.options);








