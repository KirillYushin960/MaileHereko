import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { userStore } from '@store/UserStore';
import { LogoutDialog } from '@components/LogoutDialog';
import { useDevice } from '@hooks';
import { UserMenu } from '@components/UserMenu';
import { NavLinks } from '@components/NavLinks';
import { MobileMenu } from '@components/MobileMenu';
import { style } from './style';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '@assets/logo.svg';

export const Header = observer(() => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { isMobile } = useDevice();

  const { user } = userStore;

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDrawerOpen(false);
    setAnchorEl(null);
  };

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
              onClick={() => setDrawerOpen(true)}
              sx={style.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <MobileMenu
              open={isDrawerOpen}
              onClose={() => setDrawerOpen(false)}
              setDialogOpen={setDialogOpen}
            />
          </>
        ) : (
          <Box sx={style.linkContainer}>
            <NavLinks isMobile={false} onClose={() => setDrawerOpen(false)} />

            {user && (
              <UserMenu
                handleDialogOpen={() => setDialogOpen(true)}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
              />
            )}
          </Box>
        )}
      </Toolbar>

      <LogoutDialog isOpen={isDialogOpen} handleClose={handleDialogClose} />
    </AppBar>
  );
});
