import { FC, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes, bootRoutePath } from './utils/routeUtils';
import { RequireAuth } from '@bka-stuff/pe-mfe-utils';

function NotFound() {
  return <div>Not found</div>;
}

export const BaseRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {routes.map((route) => {
        const { path, normal, delayed } = route;
        const Component = path === bootRoutePath ? delayed : normal;

        const baseRoute = (
          <Route key={path} path={path} element={
            <Suspense fallback={<div>Loading and stuff...</div>}          >
              <Component />
            </Suspense>
          } />
        );

        if (path === '/dashboard/*') return baseRoute;

        return (
          <Route key={path} element={<RequireAuth redirectUrl='/dashboard' />}>
            {baseRoute}
          </Route>
        );
      })}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}