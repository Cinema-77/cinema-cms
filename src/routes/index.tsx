import { Switch } from 'react-router-dom';
import routes from './routes';
import { RouteWithSubRoutes } from './config';

export const AppRoutes = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
};
