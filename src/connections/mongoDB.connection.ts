import mongoose from 'mongoose';
import { config } from '../utils/config';
import { getLogger } from '../utils/logger/logger';

const logger = getLogger(module);
mongoose.Promise = Promise;

if (process.env.MONGOOSE_DEBUG) {
    mongoose.set('debug', true);
}

const db = mongoose.connection;

db.on('connected', () => logger.debug('Mongoose connection was opened'));
db.on('error', err => logger.error('Mongoose connection has occured ', err));
db.on('disconnected', () => logger.info('Mongoose was disconnected'));

process.on('SIGINT', () => {
    db.close().then(() => {
        logger.info('Mongoose connection is disconnected due to application termination');
        process.exit(0);
    });
});

export const mongooseConnection = mongoose.connect(config.mongoDB.connectionString);
export function isObjectId(str: string): boolean {
    return mongoose.Types.ObjectId.isValid(str);
}

