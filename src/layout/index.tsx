import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Box } from '@mui/material';
import { style } from './style';

export const Layout = () => (
  <>
    <Header />
    <Box sx={style.container}>
      <Box sx={style.backgroundImageContainer}>
        <Box sx={style.content}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  </>
);
