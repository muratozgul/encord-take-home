import type { IImage, IImageData } from '../../types';

// source: https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#example_showing_files_size
export const sizeToStr = (numberOfBytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(
    Math.floor(Math.log(numberOfBytes) / Math.log(1024)),
    units.length - 1,
  );
  const approx = numberOfBytes / 1024 ** exponent;
  const output =
    exponent === 0
      ? `${numberOfBytes} bytes`
      : `${approx.toFixed(0)} ${units[exponent]}`;
  return output;
}

// export const fileToLocalImage = (file: File, uploadTime: number): IImage => {
//   return {
//     id: file.name,
//     name: file.name,
//     size: file.size,
//     uploadTime,
//   };
// }

export const processImage = (file: File): Promise<IImageData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = reject;
    reader.onload = ((e) => {
      const image = new Image();
      if (e?.target?.result) {
        const src = e.target.result.toString();
        image.onerror = reject;
        image.onload = () => {
          const width  = image.naturalWidth;
          const height = image.naturalHeight;
          const size = sizeToStr(file.size);
          const uploadTime = Date.now();
          resolve({ width, height, src, size, uploadTime, name: file.name });
        }
        image.src = src;
      }
    });
  });
}
