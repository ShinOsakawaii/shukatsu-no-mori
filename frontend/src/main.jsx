import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { queryClient } from './api/queryClient.js'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

// mui 스타일 설정
const theme = createTheme({
  typography: {
    fontFamily: ["Gaegu", "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Segoe UI Emoji", "Segoe UI Symbol", "sans-serif"].join(',')
  },
  palette: {
    primary: {
      main: '#606C38',
      contrastText: '#fff',
    },
    secondary: {
      main: '#DDA15E', // 나무색
    },
    background: {
      default: '#F0EAD2', // 배경
      box: '#DDE5B6',
      paper: '#F0EAD2', // 카드나 테이블 배경
      button: '#A98467' // 버튼
    },
    text: {
      primary: '#6C584C', // 아주 짙은 녹색 (검정 대신 사용)
    },
  },
  shape: {
    borderRadius: 12, // 딱딱한 직각보다 둥근 모서리가 자연 친화적입니다.
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
