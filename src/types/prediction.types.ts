import { IImage } from './image.types';

export interface IBoundingBox {
  x1: number
  x2: number
  y1: number
  y2: number
}

export interface IPrediction {
  bbox: IBoundingBox
  label: string
  score: number
}

export interface IPredictionRequestParams {
  title: string
  description: string
}

export interface IPredictionResponse {
  image: IImage
  title: string
  description: string
  predictions: IPrediction[]
}

export interface IUploadedImage extends IImage {
  title: string
  description: string
  predictions: IPrediction[]
  predictionTime: number
}

export interface IPredictionsState {
  uploadedImages: Record<IUploadedImage['id'], IUploadedImage>
  dialogImageId: string | null
}