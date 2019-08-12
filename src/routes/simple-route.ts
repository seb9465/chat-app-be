import { injectable } from "inversify";
import { Router, Request, Response } from "express";
import { WebService } from "../WebService";

@injectable()
export class SimpleRoute extends WebService {

    public readonly mainRoute: string = "/";

    public constructor() {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/simpleRoute", (req: Request, res: Response) => {
            res.send("Simple Route");
        });

        return router;
    }
}
