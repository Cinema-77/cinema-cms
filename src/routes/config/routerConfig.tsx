import { Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Head } from '@/components/Head';

export function RouteWithSubRoutes(route: any) {
  if (route.auth) {
    return (
      <PrivateRoute
        path={route.path}
        render={(props: any) => (
          // pass the sub-routes down to keep nesting
          <>
            <Head title={route.title} />
            <route.component {...props} routes={route.routes} />
          </>
        )}
      />
    );
  }

  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <>
          <Head title={route.title} />
          <route.component {...props} routes={route.routes} />
        </>
      )}
    />
  );
}
