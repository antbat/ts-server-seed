import { App } from './app';
import { wordIndexCreate } from './connections/elasticSearch.connection';
import { RootController } from './domains/root.controller';
import { logger } from './utils/logger';
import { config } from './utils/config';
import { mongooseConnection } from './connections/mongoDB.connection'
import bodyParser from 'body-parser';
import cors from 'cors';



( async () => {

    // database setup
    await wordIndexCreate();
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
    app.listen(config.port);
})();


