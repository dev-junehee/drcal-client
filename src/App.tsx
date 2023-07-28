import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import themes from '@/styles/Themes.ts';
import GlobalStyle from '@/styles/GlobalStyle.ts';
import SideBar from '@/components/SideBar';

const App = () => {
  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <SideBar />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
