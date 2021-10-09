import { Switch } from 'react-router-dom';

import { RouteWithSubRoutes } from './config';
import routes from './routes';

export const AppRoutes = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
};
