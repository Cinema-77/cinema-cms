import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '@/lib/auth';

export function PrivateRoute(props: any) {
  const auth = useAuth();
  if (!auth.user) {
    return (
      <Route>
        <Redirect to="/" />
      </Route>
    );
  }

  return <Route {...props} />;
}
