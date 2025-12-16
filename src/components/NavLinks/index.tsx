import { navItems } from '@constants';
import { Box, Button, Typography } from '@mui/material';
import { userStore } from '@store/UserStore';
import { MenuItem } from '@types';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ArrowRight from '@assets/icons/arrow-right.svg';
import Logout from '@assets/icons/logout.svg';
import { style } from './style';

interface INavLinks {
  isMobile: boolean;
  onClose: () => void;
  setDialogOpen?: (value: boolean) => void;
}

export const NavLinks = observer(({ isMobile, onClose, setDialogOpen }: INavLinks) => {
  const location = useLocation();
  const { user, isLoading, setLastVisitedPage } = userStore;

  const renderNavItem = ({ path, label, requiresAuth }: MenuItem) => {
    if (requiresAuth && !user) return null;

    return (
      <Button key={path} sx={style.link} component={Link} to={path} onClick={onClose}>
        <Typography variant="linkRegular">{label}</Typography>
      </Button>
    );
  };

  const handleSignInClick = () => {
    setLastVisitedPage(location.pathname);
    onClose();
  };

  return (
    <>
      {navItems.map(renderNavItem)}

      {!user && !isLoading && location.pathname !== '/login' && (
        <Button
          sx={style.link}
          endIcon={<Box component="img" src={ArrowRight} alt="sign in" />}
          component={Link}
          to="/login"
          onClick={handleSignInClick}
        >
          <Typography variant="linkRegular">Sign in</Typography>
        </Button>
      )}

      {user && isMobile && (
        <Button onClick={() => setDialogOpen?.(true)}>
          <Box component="img" src={Logout} alt="logout" />

          <Typography variant="linkRegular" sx={style.link}>
            Logout
          </Typography>
        </Button>
      )}
    </>
  );
});
