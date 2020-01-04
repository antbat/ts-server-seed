import express, { NextFunction, Response, Request } from 'express';
import { Application } from 'express';
import { Logger } from 'winston'
import { HttpError } from './utils/HttpError';
import { IController } from './utils/Controllers';
import { getLogger } from './utils/logger/logger';
import cors from "cors";
import bodyParser from "body-parser";
import { ElasticsearchService } from "./utils/elasticsearch.service";
import { client } from "./connections/elasticSearch.connection";
import { mongooseConnection } from "./connections/mongoDB.connection";
import { RootController } from "./domains/root/root.controller";

const logger = getLogger(module);

export class App {

    public application: Application;
    private logger: Logger;

    constructor (controllers: IController[], middleware: any[], logger: Logger) {

        this.logger = logger;
        this.application = express();

        middleware.forEach( one =>
            this.application.use(one)
        );
        controllers.forEach( controller =>
            controller.registerRoutes(this.application)
        );

        this.application.use( (error: HttpError, request: Request, response: Response, _next: NextFunction) => {
            const status = error.status || 500;
            const message = error.message || 'Something went wrong';
            response
                .status(status)
                .send({
                    status,
                    message,
                })
        });
    }
    public listen(port: number) {
        this.application.listen(port, () => {
            this.logger.info(`the application are listening on ${port}`);
        });
    }
}

export async function getApp(): Promise<App> {
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
    return new App(controllers, middleware, logger);
}
