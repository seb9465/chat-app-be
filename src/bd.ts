import { injectable } from 'inversify';
import { Response } from 'express';
import { Mongoose } from 'mongoose';
import * as dotenv from 'dotenv';

@injectable()
export class BD {
    
    private uri: string;
    private mongoose: Mongoose;

    public constructor() {
        dotenv.config();

        this.configureUri();

        this.mongoose = new Mongoose();
    }

    public configureUri(): void {
        const prefix = process.env['MONGO_PREFIX'];
        const host = process.env['MONGO_HOST'];
        const user = process.env['MONGO_USER'];
        const pwd = process.env['MONGO_PWD'];
        const db = process.env['MONGO_DATABASE'];
        const options = process.env['MONGO_OPTIONS'];

        this.uri = prefix + '://' + user + ':' + pwd + '@' + host + '/' + db;

        if (options) {
            this.uri += '?' + options;
        }

        console.log('[DB] URI : ' + this.uri);
    }

    public registerEvents(): void {
        this.mongoose.connection.on('connected', () => {
            console.log('[DB] Connected to ' + this.uri);
        });

        this.mongoose.connection.on('connecting', () => {
            console.log('[DB] Connecting to ' + this.uri);
        });

        this.mongoose.connection.on('error', (err) => {
            console.error('[DB] Error : ' + err);
        });
    }

    public connectToDb(res: Response): void {
        this.mongoose.connect(this.uri, { useNewUrlParser: true });
    }
}
