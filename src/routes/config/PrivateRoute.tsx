import { useAuth } from '@/lib/auth';
import { Redirect, Route } from 'react-router-dom';

export function PrivateRoute(props: any) {
  const auth = useAuth();
  if (!auth.user) {
    return (
      <Route>
        <Redirect to="/auth" />
      </Route>
    );
  }

  return <Route {...props} />;
}
