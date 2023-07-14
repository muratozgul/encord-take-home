import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ImagesTable from './ImagesTable';
import ImageUplaod from './ImageUpload';
import ImageDialog from './ImageDialog';

function ImagesPage() {
  return (
    <>
      <Stack
        direction='row'
        spacing={2}
        sx={{ padding: 2, paddingBottom: 0, alignItems: 'center' }}>
        <Typography variant="h4">
          Images
        </Typography>
        <ImageUplaod />
      </Stack>
      <Box sx={{ padding: 2 }}>
        <Paper elevation={1}>
          <ImagesTable />
        </Paper>
      </Box>
      <ImageDialog />
    </>
  );
}

export default ImagesPage;
