import express, { NextFunction, Response, Request } from 'express';
import { Application } from 'express';
import { Logger } from 'winston'
import { HttpError } from './utils/HttpError';
import { IController } from './utils/Controllers';


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

        this.application.use( (error: HttpError, request: Request, response: Response, next: NextFunction) => {
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
