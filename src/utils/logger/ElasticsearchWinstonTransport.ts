import Transport  = require('winston-transport');
import { TransportStreamOptions } from "winston-transport";
import { RequestParams, Client } from "@elastic/elasticsearch";

export interface ElasticsearchWinstonTransportOptions extends TransportStreamOptions{
    client: Client;
    index: string;
    label: string;
    env: string;
}
export class ElasticsearchWinstonTransport extends Transport {

    private readonly client: Client;
    private readonly index: string;
    private readonly  label: string;
    private readonly  env: string;

    constructor(options: ElasticsearchWinstonTransportOptions) {
        super(options);

        this.client = options.client;
        this.index = options.index;
        this.label = options.label;
        this.env = options.env;
    }
    log(info: any, next: () => void): any {
        if (info) {
            const doc: RequestParams.Index = {
                index: this.index,
                body: {
                    data: info.body || {},
                    message: info.message,
                    level: info.level,
                    label: this.label,
                    env: this.env
                }
            };
            this.client.index(doc).catch( (err) =>
                console.error(err)
            );
        }
    }
}

