import { useState } from 'react';
import { observer } from 'mobx-react-lite';
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
import Logout from '@assets/icons/logout.svg';
import UserSquare from '@assets/icons/user-square.svg';
import { userStore } from '@store/UserStore';

export const Header = observer(() => {
  const { user, isLoading, loginWithGoogle, logout } = userStore;
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

      {!isLoading && (
        <>
          {!user ? (
            <Button
              sx={style.link}
              endIcon={
                <Box component="img" src={ArrowRight} alt="sign in icon" draggable="false" />
              }
              onClick={loginWithGoogle}
              disabled={isLoading}
            >
              <Typography variant="linkRegular">Sign in</Typography>
            </Button>
          ) : (
            <>
              <Button
                sx={style.link}
                component={Link}
                to={`/favorites/${user.uid}`}
                onClick={() => handleDrawerToggle(false)}
              >
                <Typography variant="linkRegular">Favorites</Typography>
              </Button>
              <Button
                sx={style.link}
                startIcon={<Box component="img" src={Logout} alt="logout icon" draggable="false" />}
                onClick={logout}
                disabled={isLoading}
              >
                <Typography variant="linkRegular">Logout</Typography>
              </Button>

              <Box
                component="img"
                src={user.photoURL || UserSquare}
                alt="profile image"
                draggable="false"
                sx={{ height: '24px' }}
              />
              <Typography variant="bodyLarge">{user.displayName?.split(' ')[0]}</Typography>
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <AppBar position="fixed" sx={style.appBar}>
      <Toolbar sx={style.toolbar}>
        <IconButton component={Link} to="/" sx={style.logoButton}>
          <Box component="img" src={Logo} alt="Logo" draggable="false" />
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
});
