import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { queryClient } from './api/queryClient';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <CssBaseline />
    <App />
  </QueryClientProvider>
)
