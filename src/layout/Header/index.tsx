import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { style } from './style';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRight from '@assets/icons/arrow-right.svg';
import Logo from '@assets/logo.svg';

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleDrawerToggle = (open: boolean) => {
    setDrawerOpen(open);
  };

  const links = (
    <>
      <Button
        sx={style.link}
        component={Link}
        to="/anime"
        onClick={() => handleDrawerToggle(false)}
      >
        <Typography variant="linkRegular">Anime</Typography>
      </Button>

      <Button
        sx={style.link}
        component={Link}
        to="/manga"
        onClick={() => handleDrawerToggle(false)}
      >
        <Typography variant="linkRegular">Manga</Typography>
      </Button>

      <Button
        sx={style.link}
        // component={Link}
        // to="/"
        endIcon={<img src={ArrowRight} alt="Arrow Right" draggable="false" />}
        onClick={() => handleDrawerToggle(false)}
      >
        <Typography variant="linkRegular">Suggest me</Typography>
      </Button>
    </>
  );

  return (
    <AppBar position="fixed" sx={style.appBar}>
      <Toolbar sx={style.toolbar}>
        <IconButton component={Link} to="/" sx={style.logoButton}>
          <img src={Logo} alt="Logo" draggable="false" />
        </IconButton>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => handleDrawerToggle(true)}
              sx={style.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => handleDrawerToggle(false)}
              PaperProps={{ sx: { ...style.menu } }}
            >
              {links}
            </Drawer>
          </>
        ) : (
          <Box sx={style.linkContainer}>{links}</Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
