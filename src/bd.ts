import { injectable } from "inversify";
import { Response } from "express";
import { Mongoose } from 'mongoose';

@injectable()
export class BD {
    // private readonly uri: string = 'mongodb://admin:admin@localhost:27017/chat-test';
    private readonly uri: string = 'mongodb+srv://user1:allo@chat-test-zpcun.mongodb.net/chat-test?retryWrites=true&w=majority';
    private mongoose: Mongoose;

    public constructor() {
        this.mongoose = new Mongoose();
    }

    public connectToDb(res: Response): void {
        this.mongoose.connect(this.uri, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log("WORKING");
                res.send("WORKING");
            }
        });
    }
}
