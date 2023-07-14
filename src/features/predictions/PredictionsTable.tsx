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
import Typography from '@mui/material/Typography';
import { predictionsSlice } from './predictionsSlice';
import type { IReduxState, IUploadedImage } from '../../types';

interface PredictionsTableProps {
  images: IUploadedImage[]
  openDialog: (imageId: string) => void
}

class PredictionsTable extends React.PureComponent<PredictionsTableProps> {
  renderTableHead() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Thumbnail</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Prediction Time</TableCell>
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
                <TableCell>{img.title}</TableCell>
                <TableCell>{img.description}</TableCell>
                <TableCell>{new Date(img.predictionTime).toISOString()}</TableCell>
                <TableCell>
                  <Button onClick={() => this.props.openDialog(img.id)}>
                    VIEW
                  </Button>
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
      return <Typography p={2}>No predictions found.</Typography>;
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
  const { uploadedImages } = state.predictions;
  return {
    images: Object.values(uploadedImages).sort((a, b) => a.uploadTime - b.uploadTime),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const { actions } = predictionsSlice;
  return {
    openDialog: (imageId: string) => dispatch(actions.setDialogImageId({ imageId })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PredictionsTable);
