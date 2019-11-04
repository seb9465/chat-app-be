import { injectable, inject } from 'inversify';
import { Router, Request, Response } from 'express';
import { WebService } from '../WebService';
import { BD } from '../bd';
import Types from '../Types';

@injectable()
export class SimpleRoute extends WebService {

    public readonly mainRoute: string = '/';

    public constructor(
        @inject(Types.BD) private _bd: BD
    ) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get('/simpleRoute', (req: Request, res: Response) => {
            this._bd.connectToDb(res);
        });

        return router;
    }
}
