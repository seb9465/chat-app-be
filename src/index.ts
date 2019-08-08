import { App } from './app';
import 'reflect-metadata';
import { container } from './inversify.config';

export const SERVER: App = container.get<App>('App');

SERVER.init();
