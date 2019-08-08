import { injectable } from 'inversify';
import { Router } from 'express';

@injectable()
export abstract class WebService {
    public readonly mainRoute: string;
    public abstract get routes(): Router;
}
