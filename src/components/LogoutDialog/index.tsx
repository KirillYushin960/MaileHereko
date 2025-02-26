import { projectName } from '@constants';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { userStore } from '@store/UserStore';
import { style } from './style';

interface IDialog {
  isOpen: boolean;
  handleClose: () => void;
}

export const LogoutDialog = ({ isOpen, handleClose }: IDialog) => {
  const { logout } = userStore;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      disableScrollLock={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={style.dialogContainer}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="bodyLarge" sx={style.dialogText}>
          {projectName}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="bodyRegular" sx={style.dialogText}>
            Are you sure you want to log out?
          </Typography>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          <Typography variant="bodySmall" sx={style.dialogStayText}>
            Stay
          </Typography>
        </Button>

        <Button
          onClick={() => {
            handleClose();
            logout();
          }}
          autoFocus
        >
          <Typography variant="bodySmall" sx={style.dialogLogoutText}>
            Log Out
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
