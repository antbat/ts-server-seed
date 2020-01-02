import { Client } from '@elastic/elasticsearch';

import { config } from '../utils/config';
import { logger } from '../utils/logger';

export const client = new Client(config.elasticSearch.options);


export async function wordIndexCreate() {
    const indexName = config.elasticSearch.index.word;
    const isExist = await isIndexExists(indexName);
    if (!isExist) {
        await client.indices.create({
            index: indexName,
            body: elasticIndexBody
        });
        await client.indices.putMapping({
            index: indexName,
            body: elasticIndexMapping
        });
    }
}

async function isIndexExists(index: string): Promise<boolean>{
    const result: any = await client.indices.exists({ index });
    return result?.body;
}

client.cluster.health({},function(err, resp) {
    if(err){
        return logger.error('ES cluster health was retrieved with error', err);
    }
    logger.debug('ES cluster health: ', resp);
});

const elasticIndexBody = {
    settings: {
        analysis: {
            analyzer: {
                english_exact: {
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase"
                    ]
                },
                phrase_analyzer: {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": [ "lowercase", "shingle"]
                }
            },
            filter: {
                shingle: {
                    "type": "shingle",
                    "min_shingle_size": 2,
                    "max_shingle_size": 3
                }
            }
        }
    }
};
const elasticIndexMapping = {
    properties: {
        text: {
            type: "text",
            analyzer: "english",
            fields: {
                phrase: {
                    "type": "text",
                    "analyzer": "phrase_analyzer"
                },
                exact: {
                    "type": "text",
                    "analyzer": "english_exact"
                },
                keyword: {
                    "type": "keyword",
                    "ignore_above": 256
                },
                completion: {
                    "type": "completion",
                    "preserve_separators": true,
                    "preserve_position_increments": true,
                    "max_input_length": 100
                }
            }
        }
    }
};
