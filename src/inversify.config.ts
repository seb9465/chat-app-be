import { Container } from 'inversify';
import { App } from './app';
// import Types from './Types';

const container: Container = new Container();

container.bind('App').to(App);

export { container };
