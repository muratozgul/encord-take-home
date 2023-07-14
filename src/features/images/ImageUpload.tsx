import React, { useRef, useCallback, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { imagesSlice } from './imagesSlice';

function ImageUplaod() {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const onChange = useCallback(() => {
    if (fileInputRef.current?.files) {
      dispatch(
        imagesSlice.actions.onFileInputChange({
          files: fileInputRef.current.files
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    let ref: HTMLInputElement | null = null;
    if (fileInputRef.current) {
      ref = fileInputRef.current;
      ref.addEventListener('change', onChange);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('change', onChange);
      }
    }
  }, [onChange]);

  return (
    <>
      <input
        ref={fileInputRef}
        hidden
        accept="image/*"
        id="file-input"
        multiple
        type="file"
      />
      <Button
        onClick={onClick}
        variant="contained"
      >
        Upload
      </Button>
    </>
  );
}

export default ImageUplaod;
