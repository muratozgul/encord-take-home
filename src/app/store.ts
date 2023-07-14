import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { imagesSlice } from '../features/images/imagesSlice';
import { imagesSaga } from '../features/images/imagesSaga';
import { predictionsSlice } from '../features/predictions/predictionsSlice';
import  { IReduxState } from '../types';

export function setupStore(preloadedState?: PreloadedState<IReduxState>) {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    preloadedState,
    reducer: {
      images: imagesSlice.reducer,
      predictions: predictionsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => (
      getDefaultMiddleware(
        {
          serializableCheck: {
            ignoredActions: [imagesSlice.actions.onFileInputChange.type]
          }
        }
      ).concat(sagaMiddleware)
    ),
  });

  sagaMiddleware.run(function* () {
    yield all([imagesSaga()]);
  });

  return store;
}
