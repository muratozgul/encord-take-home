import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { imagesSlice } from './imagesSlice';
import type { IReduxState, IImage } from '../../types';

interface ImagesTableProps {
  loading: boolean
  images: IImage[]
  openDialog: (imageId: string) => void
  removeImage: (imageId: string) => void
}

class ImagesTable extends React.PureComponent<ImagesTableProps> {
  renderTableHead() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Thumbnail</TableCell>
          <TableCell>File Name</TableCell>
          <TableCell>Size</TableCell>
          <TableCell>Upload Time</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  renderTableBody() {
    return (
      <TableBody>
        {
          this.props.images.map(img => {
            return (
              <TableRow key={img.id} data-testid='image-row'>
                <TableCell>
                  <img
                    src={img?.src}
                    alt={img?.name}
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{img.name}</TableCell>
                <TableCell>{img.size}</TableCell>
                <TableCell>{new Date(img.uploadTime).toISOString()}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => this.props.openDialog(img.id)}
                    disabled={this.props.loading}
                  >
                    PREDICT
                  </Button>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => this.props.removeImage(img.id)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    );
  }

  renderInfo() {
    const { images } = this.props;
    if (images.length === 0) {
      return <Typography p={2}>No images found.</Typography>;
    }
    return null;
  }

  render() {
    return (
      <>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} data-testid='images-table'>
            {this.renderTableHead()}
            {this.renderTableBody()}
          </Table>
        </TableContainer>
        {this.renderInfo()}
      </>
    );
  }
}

function mapStateToProps(state: IReduxState) {
  const { localImages, uploadImageReq } = state.images;
  return {
    loading: uploadImageReq.loading,
    images: Object.values(localImages).sort((a, b) => a.uploadTime - b.uploadTime),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const { actions } = imagesSlice;
  return {
    openDialog: (imageId: string) => dispatch(actions.setDialogImageId({ imageId })),
    removeImage: (imageId: string) => dispatch(actions.removeImage({ imageId })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesTable);
