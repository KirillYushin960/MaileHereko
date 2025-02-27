import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { userStore } from '@store/UserStore';
import { ProfileInfo } from '@ui/ProfileInfo';
import { observer } from 'mobx-react-lite';
import { MouseEvent } from 'react';
import Logout from '@assets/icons/logout.svg';
import UserSquare from '@assets/icons/user-square.svg';
import { style } from './style';

interface IUserMenu {
  handleDialogOpen: () => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
}

export const UserMenu = observer(({ handleDialogOpen, anchorEl, setAnchorEl }: IUserMenu) => {
  const { user } = userStore;
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account" slotProps={{ popper: { sx: style.tooltip } }}>
        <IconButton
          onClick={handleOpenMenu}
          size="small"
          aria-controls={isMenuOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
        >
          <Avatar sx={style.avatar} src={user?.photoURL || UserSquare} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        disableScrollLock={true}
        slotProps={{ paper: { sx: style.menu } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <ProfileInfo />

        <Divider sx={style.menuDivider} />

        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleDialogOpen();
          }}
        >
          <Box component="img" src={Logout} alt="logout icon" draggable="false" />

          <Typography variant="bodySmall" sx={style.menuItem}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
});
