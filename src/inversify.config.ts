import { Container } from 'inversify';
import { App } from './app';
import { SimpleRoute } from './routes/simple-route';
import Types from './Types';
import { BD } from './bd';
import { Login } from './Routes/login';

const container: Container = new Container();

container.bind('App').to(App);

container.bind(Types.SimpleRoute).to(SimpleRoute);

container.bind(Types.BD).to(BD);

container.bind(Types.Login).to(Login);

export { container };
