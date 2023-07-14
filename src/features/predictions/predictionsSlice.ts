import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { imagesSlice } from '../images/imagesSlice';
import type { IPredictionsState } from '../../types';

export const initialState: IPredictionsState = {
  uploadedImages: {},
  dialogImageId: null,
};

export const predictionsSlice = createSlice({
  name: 'predictions',
  initialState,
  reducers: {
    setDialogImageId: (state, action: PayloadAction<{ imageId: IPredictionsState['dialogImageId'] }>) => {
      state.dialogImageId = action.payload.imageId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      imagesSlice.actions.uploadImageFulfilled,
      (state, action) => {
        const { image, title, description, predictions } = action.payload;
        state.uploadedImages[image.id] = {
          ...image,
          title,
          description,
          predictions,
          predictionTime: Date.now(),
        };
      }
    );
  }
});
