import { IImagesState } from './image.types';
import { IPredictionsState } from './prediction.types';
export * from './shared.types';
export * from './image.types';
export * from './prediction.types';

export interface IReduxState {
  images: IImagesState,
  predictions: IPredictionsState,
}
