import { TRequestStatus } from './shared.types';

export interface IImageData {
  name: string
  width: number
  height: number
  src: string
  size: string
  uploadTime: number
}

export interface IImage extends IImageData {
  id: string
  name: string
}

export interface IImagesState {
  localImages: Record<IImage['id'], IImage>
  dialogImageId: string | null
  uploadImageReq: TRequestStatus
}
