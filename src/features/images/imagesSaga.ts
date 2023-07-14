import { imagesSlice } from './imagesSlice';
import { put, select, takeEvery } from 'redux-saga/effects';
import { processImage } from './imageUtils';
import { router } from '../../router';
import type { IReduxState, IImage, IPredictionResponse, IImageData } from '../../types';
import { d } from 'vitest/dist/types-e3c9754d.js';

const {
  onFileInputChange, uploadImage, removeImage
} = imagesSlice.actions;

function* uploadImageSaga(action: ReturnType<typeof uploadImage>) {
  yield put(imagesSlice.actions.uploadImagePending());  
  try {
    const url = 'http://localhost:3000/predict';
    // const body = {
    //   title: action.payload.title,
    //   description: action.payload.description,
    // } as IPredictionRequestParams;
    // const response: Response = yield fetch(url, {
    //   method: 'POST',
    //   headers: { 'content-type': 'application/json' },
    //   body: JSON.stringify(body),
    // });
    const mockResponse: Response = yield fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });
    if (mockResponse.status < 200 || mockResponse.status >= 300) {
      throw new Error('Something went wrong!');
    }
    const res: IPredictionResponse = yield mockResponse.json();
    yield put(imagesSlice.actions.setDialogImageId({ imageId: null }));
    const { imageId, title, description } = action.payload;
    const image: IImage = yield select((state: IReduxState) => 
      state.images.localImages[imageId]
    );
    yield put(
      imagesSlice.actions.uploadImageFulfilled({
        image,
        title,
        description,
        predictions: res.predictions,
      })
    );
    router.navigate('/predictions');
  }
  catch (err: any) {
    yield put(
      imagesSlice.actions.uploadImageRejected({
        imageId: action.payload.imageId,
        error: { message: err?.message || 'Something went wrong!' }
      })
    );
  }
}

function* processImagesSaga(action: ReturnType<typeof onFileInputChange>) {
  const { files } = action.payload;
  const filesArr = Array.from(files);
  const data: IImageData[] = yield Promise.all(
    filesArr.map(f => processImage(f))
  );
  yield put(
    imagesSlice.actions.addImages({
      images: data.map(d => ({ ...d, id: d.name }))
    })
  );
}

export function* imagesSaga() {
  yield takeEvery(onFileInputChange, processImagesSaga);
  yield takeEvery(uploadImage, uploadImageSaga);
}
