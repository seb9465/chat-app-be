import { Container } from 'inversify';
import { App } from './app';
import { SimpleRoute } from './routes/simple-route';
import Types from './Types';

const container: Container = new Container();

container.bind('App').to(App);

container.bind(Types.SimpleRoute).to(SimpleRoute);

export { container };
