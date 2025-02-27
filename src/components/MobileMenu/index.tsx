import { NavLinks } from '@components/NavLinks';
import { Box, Drawer } from '@mui/material';
import { ProfileInfo } from '@ui/ProfileInfo';
import { style } from './style';

interface IMobileMenu {
  open: boolean;
  onClose: () => void;
  setDialogOpen: (value: boolean) => void;
}

export const MobileMenu = ({ open, onClose, setDialogOpen }: IMobileMenu) => (
  <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: style.drawer }}>
    <Box sx={style.container}>
      <NavLinks
        isMobile
        onClose={onClose}
        setDialogOpen={() => {
          onClose();
          setDialogOpen(true);
        }}
      />
    </Box>

    <ProfileInfo />
  </Drawer>
);
