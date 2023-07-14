import React, { useState, useCallback, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { predictionsSlice } from './predictionsSlice';
import { useWindowSize } from './predictionUtils';
import type { IReduxState } from '../../types';

function PredictionDialog() {
  const dispatch = useDispatch();
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement | null>(null);
  const windowSize = useWindowSize();

  const {
    dialogImageId, uploadedImages
  } = useSelector((state: IReduxState) => state.predictions);
  const isOpen = !!(dialogImageId && uploadedImages[dialogImageId]);
  const image = isOpen ? uploadedImages[dialogImageId] : null;

  const onCancel = () => {
    dispatch(predictionsSlice.actions.setDialogImageId({ imageId: null }));
  }

  const imageRefFn = useCallback((el: HTMLImageElement) => {
    if (el) {
      setImageEl(el);
    }
  }, [setImageEl]);

  const canvasRefFn = useCallback((el: HTMLCanvasElement) => {
    if (el) {
      setCanvasEl(el);
    }
  }, [setCanvasEl]);

  useLayoutEffect(() => {
    if (canvasEl && imageEl && image) {
      const width = imageEl.clientWidth;
      const height = imageEl.clientHeight;
      const scaleFactor = width / image.width;
      canvasEl.width = width;
      canvasEl.height = height;
      const ctx = canvasEl.getContext('2d')!;
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      ctx.font = '16px Arial';
      ctx.textAlign = 'right';
      const color = '#6666ff';
      image.predictions.forEach((p) => {
        const { x1, x2, y1, y2 } = p.bbox;
        ctx.rect(
          x1 * scaleFactor,
          y1 * scaleFactor,
          (x2 - x1) * scaleFactor,
          (y2 - y1) * scaleFactor,
        );
        ctx.strokeStyle = color;
        ctx.fillStyle = `${color}18`;
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fillText(
          `${p.label} (${p.score})`,
          x2 * scaleFactor - 8,
          y2 * scaleFactor - 8
        );
      });
    }
  }, [image, imageEl, canvasEl, windowSize]);

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle>{image?.title}</DialogTitle>
      <DialogContent>
        <div style={{ position: 'relative' }}>
          <img
            ref={imageRefFn}
            style={{ width: '100%' }}
            alt={image?.name}
            src={image?.src}
          />
          <canvas
            id="viewport"
            key={image?.id || 'unknown'}
            ref={canvasRefFn}
            style={{ position: 'absolute', top: 0 }}
          />
        </div>
        <DialogContentText>{image?.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PredictionDialog;
