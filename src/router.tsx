import React, { lazy, Suspense } from 'react';
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App';

const ImagesPageLazy = lazy(() => import('./features/images/ImagesPage'));
const PredictionsPageLazy = lazy(() => import('./features/predictions/PredictionsPage'));

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route
      path="/images"
      element={(
        <Suspense fallback={<div>Loading...</div>}>
          <ImagesPageLazy />
        </Suspense>
      )}
    />
    <Route
      path="/predictions"
      element={(
        <Suspense fallback={<div>Loading...</div>}>
          <PredictionsPageLazy />
        </Suspense>
      )}
    />
    <Route path="" element={<Navigate to="/images" replace />} />
    <Route path="*" element={<div>Not Found</div>} />
  </Route>
);

export const router = createBrowserRouter(routes);
