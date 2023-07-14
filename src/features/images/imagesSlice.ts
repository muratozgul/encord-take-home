import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import type {
  IImagesState,
  IImage,
  TReduxError,
  IPredictionRequestParams,
  IPredictionResponse,
} from '../../types';

export const initialState: IImagesState = {
  localImages: {},
  dialogImageId: null,
  uploadImageReq: {
    loading: false,
    error: null,
    lastSuccess: null,
  },
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    onFileInputChange: (state, _action: PayloadAction<{ files: FileList }>) => {},
    addImages: (state, action: PayloadAction<{ images: IImage[] }>) => {
      state.localImages = _.keyBy(action.payload.images, 'id');
    },
    removeImage: (state, action: PayloadAction<{ imageId: IImage['id'] }>) => {
      delete state.localImages[action.payload.imageId];
    },
    setDialogImageId: (state, action: PayloadAction<{ imageId: IImagesState['dialogImageId'] }>) => {
      state.dialogImageId = action.payload.imageId;
    },
    uploadImage: (
      state,
      _action: PayloadAction<{
        imageId: IImage['id'],
        title: IPredictionRequestParams['title'],
        description: IPredictionRequestParams['description'],
      }>
    ) => state,
    uploadImagePending: (state) => {
      state.uploadImageReq.loading = true;
      state.uploadImageReq.error = null;
    },
    uploadImageFulfilled: (state, action: PayloadAction<IPredictionResponse>) => {
      const { image } = action.payload;
      state.uploadImageReq.loading = false;
      state.uploadImageReq.lastSuccess = Date.now();
      state.localImages = _.omit(state.localImages, image.id);
    },
    uploadImageRejected: (
      state,
      action: PayloadAction<{ imageId: IImage['id'], error: TReduxError }>
    ) => {
      state.uploadImageReq.loading = false;
      state.uploadImageReq.error = action.payload.error;
    },
  },
});
