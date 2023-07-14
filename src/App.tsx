import { Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ marginRight: 6 }}>
            Encord
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              sx={{ color: 'white', display: 'block' }}
              onClick={() => navigate('/images')}
            >
              Images
            </Button>
            <Button
              sx={{ color: 'white', display: 'block' }}
              onClick={() => navigate('/predictions')}
            >
              Predictions
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  )
}

export default App;
