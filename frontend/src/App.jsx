import { RouterProvider } from 'react-router';
import { router } from './app/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// MUI 테마 만들기
const theme = createTheme({
  typography: {
    fontFamily: '"Gaegu", "Noto Sans KR", sans-serif', // 우선순위 순서대로
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* 브라우저 기본 스타일 초기화 */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;