import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { queryClient } from './api/queryClient.js'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

// mui 스타일 설정
const theme = createTheme({
  typography: {
    fontFamily: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Segoe UI Emoji", "Segoe UI Symbol", "sans-serif"].join(',')
  }
});

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeProvider>
)
