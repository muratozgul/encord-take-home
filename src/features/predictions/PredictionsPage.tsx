import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PredictionsTable from './PredictionsTable';
import PredictionDialog from './PredictionDialog';

function PredictionsPage() {
  return (
    <>
      <Stack
        direction='row'
        spacing={2}
        sx={{ padding: 2, paddingBottom: 0, alignItems: 'center' }}>
        <Typography variant="h4">
          Predictions
        </Typography>
      </Stack>
      <Box sx={{ padding: 2 }}>
        <Paper elevation={1}>
          <PredictionsTable />
        </Paper>
      </Box>
      <PredictionDialog />
    </>
  );
}

export default PredictionsPage;
