import Transport  = require('winston-transport');
import { TransportStreamOptions } from "winston-transport";
import { RequestParams, Client } from "@elastic/elasticsearch";

export interface ElasticsearchWinstonTransportOptions extends TransportStreamOptions{
    client: Client;
    index: string;
}
export class ElasticsearchWinstonTransport extends Transport {
    private readonly client: Client;
    private readonly index: string;
    constructor(options: ElasticsearchWinstonTransportOptions) {
        super(options);
        this.client = options.client;
        this.index = options.index;
    }
    log(info: any, next: () => void): any {
        if (info) {
            const doc: RequestParams.Index = {
                index: this.index,
                body: {
                    message: info.message,
                    level: info.level
                }
            };
            this.client
                .index(doc)
                .catch( (err) =>
                    console.error(err)
                );
        }
    }
}

