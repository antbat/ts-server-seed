import { App } from './app';
import { client } from './connections/elasticSearch.connection';
import { RootController } from './domains/root.controller';
import { getLogger } from './utils/logger';
import { config } from './utils/config';
import { mongooseConnection } from './connections/mongoDB.connection'
import bodyParser from 'body-parser';
import cors from 'cors';
import {ElasticsearchService} from "./utils/elasticsearch.service";

const logger = getLogger(module);

( async () => {

    const elasticsearchService = new ElasticsearchService(client);

    await elasticsearchService.wordIndexCreate();
    elasticsearchService.checkHealth();

    await mongooseConnection;

    // express application init
    const controllers = [
        new RootController()
    ];
    const middleware: any[] = [
        cors(),
        bodyParser.json({limit: '50mb'}),
        bodyParser.urlencoded({extended: false})
    ];
    const app = new App(controllers, middleware, logger);

    // start
    await app.listen(config.port);
    logger.info(`server started listening port ${config.port}`)
})();


