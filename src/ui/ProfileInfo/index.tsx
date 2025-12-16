import { userStore } from '@store/UserStore';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import { style } from './style';
import UserSquare from '@assets/icons/user-square.svg';

export const ProfileInfo = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { user } = userStore;

  if (!user) return;

  return isMobile ? (
    <Box sx={style.mobileContainer}>
      <Avatar sx={style.avatar} src={user.photoURL || UserSquare} />

      <Box sx={style.mobileInfoContainer}>
        <Typography variant="bodyExtraSmall" sx={style.mobileItem}>
          {user.displayName}
        </Typography>

        <Typography variant="bodyExtraSmall" sx={style.mobileItem}>
          {user.email}
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={style.container}>
      <Typography variant="bodySmall" sx={style.item}>
        {user.displayName}
      </Typography>

      <Typography variant="bodySmall" sx={style.item}>
        {user.email}
      </Typography>
    </Box>
  );
};
