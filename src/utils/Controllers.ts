/*
    parent class for all controllers
    in route system
 */

import express, { Router, Application } from 'express';

export class Controllers {
    public router: Router = express.Router();
    public readonly _base: string;

    constructor (base: string){
        this._base = base;
    }
    protected url(route: string): string {
        return this._base + route;
    }
}
export interface IController {
    registerRoutes(app: Application): void;
}
