import React, { lazy } from 'react';
import { MINIMUM_LOAD_DELAY } from './constants';
// This utility solves the problem of the Suspense fallback flickering while
//   the MFEs lazy load; it forces the fallback to stay on the screen for a
//   minimum of 500 ms by delaying the lazy load (since Suspense has no built-
//   in method for controlling how long the fallback stays on screen).
// Problem is, that causes *every* MFE to have a delay the first time it loads.
//   So, this also only delays the lazy load on initial page load, then reverts
//   to normal (i.e. non-delayed) lazy loading after that.

type RouteDefinition = {
  path: string;
  normal: React.LazyExoticComponent<any>;
  delayed: React.LazyExoticComponent<any>;
};

const bootPath = window.location.pathname;

function lazyWithMinDelay<T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>,
  minMs = MINIMUM_LOAD_DELAY,
) {
  return lazy(() =>
    Promise.all([
      importer(),
      new Promise((resolve) => setTimeout(resolve, minMs)),
    ]).then(([module]) => module)
  );
}

function buildLazyImports<T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>,
  minMs = MINIMUM_LOAD_DELAY,
) {
  return {
    normal: lazy(importer),
    delayed: lazyWithMinDelay(importer, minMs),
  };
}

function getRoutePrefix(path: string) {
  return path.replace(/\/\*$/, ''); // strips trailing "/*"
}

export const routes: RouteDefinition[] = [
  {
    path: '/job-search/*',
    ...buildLazyImports(() => import('mfe-job-search/App'), MINIMUM_LOAD_DELAY),
  },
  {
    path: '/dashboard/*',
    ...buildLazyImports(() => import('mfe-dashboard/App'), MINIMUM_LOAD_DELAY),
  },
];

export const bootRoutePath =
  routes.find((route) => {
    const prefix = getRoutePrefix(route.path);
    return bootPath.startsWith(prefix);
  })?.path ?? '/dashboard/*';
