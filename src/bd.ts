import { injectable } from "inversify";
import { MongoClient, Collection } from "mongodb";
import { Response } from "express";

@injectable()
export class BD {
    // private readonly uri: string = 'mongodb://admin:admin@localhost:27017/chat-test';
    private readonly uri: string = 'mongodb://admin:admin@chat-test-zpcun.mongodb.net/test';
    private client: MongoClient;

    public constructor() {
        this.client = new MongoClient(this.uri, { useNewUrlParser: true });
    }

    public connectToDb(res: Response): void {
        this.client.connect(err => {
            if (err) {
                console.log('ERROR');
                console.log(err);
                res.send(err);
            } else {
                const collection: Collection = this.client.db('chat-test').collection('users');
                console.log('connected');
                console.log(collection);
                res.send("Working");
            }
        });
    }
}
