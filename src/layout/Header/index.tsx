import { MouseEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
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
import { ProfileInfo } from '@ui/ProfileInfo';
import { LogoutDialog } from '@components/LogoutDialog';

export const Header = observer(() => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // constant
  const isMobile = useMediaQuery('(max-width:600px)');

  const { user, isLoading, setSighIn } = userStore;

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    handleDrawerClose();
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const links = (
    <>
      <Button sx={style.link} component={Link} to="/anime" onClick={handleDrawerClose}>
        <Typography variant="linkRegular">Anime</Typography>
      </Button>

      <Button sx={style.link} component={Link} to="/manga" onClick={handleDrawerClose}>
        <Typography variant="linkRegular">Manga</Typography>
      </Button>

      {user && (
        <Button sx={style.link} component={Link} to={'/favorites'} onClick={handleDrawerClose}>
          <Typography variant="linkRegular">Favorites</Typography>
        </Button>
      )}

      {user && isMobile && (
        <>
          <Button
            onClick={() => {
              handleCloseMenu();
              handleDialogOpen();
            }}
          >
            <Box component="img" src={Logout} alt="logout icon" draggable="false" />

            <Typography variant="linkRegular" sx={style.link}>
              Logout
            </Typography>
          </Button>
        </>
      )}

      {!user && !isLoading && (
        <Button
          sx={style.link}
          endIcon={<Box component="img" src={ArrowRight} alt="sign in icon" draggable="false" />}
          component={Link}
          to="/login"
          onClick={() => {
            handleDrawerClose();
            setSighIn();
          }}
        >
          <Typography variant="linkRegular">Sign in</Typography>
        </Button>
      )}

      {user && !isMobile && (
        <>
          <Tooltip
            title="Account"
            slotProps={{
              popper: {
                sx: {
                  ...style.profileTooltip,
                },
              },
            }}
          >
            <IconButton
              onClick={handleOpenMenu}
              size="small"
              aria-controls={isMenuOpen ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? 'true' : undefined}
            >
              <Avatar sx={style.avatar} src={user.photoURL || UserSquare} />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={isMenuOpen}
            onClose={handleCloseMenu}
            disableScrollLock={true}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  ...style.profileMenu,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <ProfileInfo />

            <Divider sx={style.profileMenuDivider} />

            <MenuItem
              onClick={() => {
                handleCloseMenu();
                handleDialogOpen();
              }}
            >
              <Box component="img" src={Logout} alt="logout icon" draggable="false" />

              <Typography variant="bodySmall" sx={style.profileMenuItem}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
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
              onClick={handleDrawerOpen}
              sx={style.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={handleDrawerClose}
              PaperProps={{ sx: { ...style.menu } }}
            >
              <Box sx={style.mobileLinksContainer}>{links}</Box>

              <ProfileInfo />
            </Drawer>
          </>
        ) : (
          <Box sx={style.linkContainer}>{links}</Box>
        )}
      </Toolbar>

      <LogoutDialog isOpen={isDialogOpen} handleClose={handleDialogClose} />
    </AppBar>
  );
});
