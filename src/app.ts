import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as cors from 'cors';
import { injectable, inject } from 'inversify';
import { WebService } from './WebService';
import Types from './Types';
import { SimpleRoute } from './routes/simple-route';
import { BD } from './bd';

@injectable()
export class App {
    private readonly internalError: number = 500;
    private readonly defaultPort: number = 3000;

    private app: express.Application;

    public constructor(
        @inject(Types.BD) private _bd: BD,
        @inject(Types.SimpleRoute) private simpleRoute: SimpleRoute
    ) {
        this.app = express();
    }

    public init(): void {
        this.middlewaresConfigs();

        const port: number | string = process.env.PORT || this.defaultPort;
        this.app.listen(port, () => {
            // tslint:disable-next-line:no-console
            return console.log('Server is listening on port ' + port);
        });

        this._bd.registerEvents();

        this.mountRoutes();
    }

    private middlewaresConfigs(): void {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, '../client')));
        this.app.use(cors());
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers',
                       'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization');
            next();
        });
    }

    /*
        Where to add the routes.
    */
    private mountRoutes(): void {
        const router: express.Router = express.Router();
        router.get('/', (req: express.Request, res: express.Response) => {
            res.send('Server\'s running.');
        });
        router.get('/favicon.ico', (req: express.Request, res: express.Response) => {
            res.send();
        });
        this.app.use('/', router);

        // this.addRoute(/*SERVICE*/);
        this.addRoute(this.simpleRoute);

        this.errorHandeling();
    }

    private addRoute(service: WebService): void {
        this.app.use(service.mainRoute, service.routes);
    }

    private errorHandeling(): void {
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error('Not Found.');
            next(err);
        });

        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        // development error handler
        // will print stacktrace
        if (this.app.get('env') === 'development') {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {}
            });
        });
    }
}
