import { Application, Request, Response, NextFunction } from 'express';
import { Controllers, IController } from '../../utils/Controllers';


export class RootController extends Controllers implements IController {
    constructor() {
        super('/');
    }
    registerRoutes(app: Application): void {
        app.route(this.url('')).get(this.getMessage);
    }

    public async getMessage(req: Request, res: Response, next: NextFunction) {
        try {
            return  res.send({msg: 'seed'});
        } catch (err) {
            next(err)
        }
    }
}
