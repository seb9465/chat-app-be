import { injectable } from 'inversify';
import { Response } from 'express';
import { Mongoose } from 'mongoose';
import * as dotenv from 'dotenv';

@injectable()
export class BD {
    // private readonly uri: string = 'mongodb://admin:admin@localhost:27017/chat-test';
    private uri: string;
    private mongoose: Mongoose;

    public constructor() {
        dotenv.config();

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
        
        this.mongoose = new Mongoose();
    }

    public connectToDb(res: Response): void {
        this.mongoose.connect(this.uri, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log('WORKING');
                res.send('WORKING');
            }
        });
    }
}
