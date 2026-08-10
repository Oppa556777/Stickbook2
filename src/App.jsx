import { Box } from '@mui/material';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar />
      <Dashboard />
    </Box>
  );
}
