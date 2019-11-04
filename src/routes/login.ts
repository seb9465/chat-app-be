import { injectable } from 'inversify';
import { Router, Request, Response } from 'express';
import { WebService } from '../WebService';

@injectable()
export class Login extends WebService {

    public readonly mainRoute: string = '/';

    public constructor() {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.post('/login', (req: Request, res: Response) => {
            res.send('login');
        });

        return router;
    }
}
