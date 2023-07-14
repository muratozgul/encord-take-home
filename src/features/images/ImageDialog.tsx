import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { imagesSlice } from './imagesSlice';
import type { IReduxState } from '../../types';

function ImageDialog() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  const {
    dialogImageId, localImages, uploadImageReq
  } = useSelector((state: IReduxState) => state.images);
  const { loading } = uploadImageReq;
  const isOpen = !!(dialogImageId && localImages[dialogImageId]);
  const imageName = isOpen ? localImages[dialogImageId].name : null;

  const onCancel = () => {
    dispatch(imagesSlice.actions.setDialogImageId({ imageId: null }));
  }

  const onChangeTitle = (text: string) => {
    setTitle(text.trim());
  }

  const onChangeDescription = (text: string) => {
    setDescription(text.trim());
  }

  const onSubmit = () => {
    if (title && description) {
      dispatch(
        imagesSlice.actions.uploadImage({
          imageId: dialogImageId!, title, description
        })
      );
    }
    else {
      setTitleError(!title);
      setDescriptionError(!description);
    }
  }

  useEffect(() => {
    if(!isOpen) {
      setTitle('');
      setDescription('');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Predict</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details for {imageName}
        </DialogContentText>
        <TextField
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          required
          error={titleError}
          disabled={loading}
        />
        <TextField
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          required
          error={descriptionError}
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={loading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageDialog;
