import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import Types from '../Types';
import { Schema, Model, Document } from 'mongoose';
import { BD } from '../bd';

interface IUser {
    id: Number;
    name: String;
    password: String;
    role: String;
}

export class CheckRole {
    private _userModel: Model<Document>;

    public constructor( @inject(Types.BD) private _db: BD ) {
        // tslint:disable-next-line:typedef
        const userSchema = new Schema({
            name: String,
            password: String,
            role: String
        });
        this._userModel = this._db.mongoose.model('User', userSchema);
    }

    // tslint:disable-next-line:typedef
    public checkRole(roles: Array<String>) {

        return async (req: Request, res: Response, next: NextFunction) => {

            // Get user ID
            const id: string = res.locals.jwtPayload.userId;
            let user: IUser;

            // Get user role from DB
            await this._userModel.findById(id)
                // tslint:disable-next-line:no-shadowed-variable
                .then((res: Document) => { user = res.toObject(); })
                .catch(() => { throw new Error('Error finding user by id') ;});

            // Check if the user's role is in the list
            if (roles.indexOf(user.role) > -1) {
                next();
            } else {
                // tslint:disable-next-line:no-magic-numbers
                res.status(401).send();
            }
        };
    };

}