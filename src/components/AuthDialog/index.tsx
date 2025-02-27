import { Link, useLocation } from 'react-router-dom';
import { userStore } from '@store/UserStore';
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
import { style } from './style';

interface IDialog {
  isOpen: boolean;
  handleClose: () => void;
}

export const AuthDialog = ({ isOpen, handleClose }: IDialog) => {
  const location = useLocation();

  const { setLastVisitedPage } = userStore;

  const handleSignInClick = () => {
    setLastVisitedPage(location.pathname);
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      disableScrollLock={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={style.container}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="bodyLarge" sx={style.message}>
          {projectName}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="bodyRegular" sx={style.message}>
            To perform this action, please sign in to your account
          </Typography>
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={style.actionContainer}>
        <Button onClick={handleClose}>
          <Typography variant="bodySmall" sx={style.cancelText}>
            Cancel
          </Typography>
        </Button>

        <Button
          component={Link}
          to="/login"
          onClick={handleSignInClick}
          autoFocus
          sx={style.signInButton}
        >
          <Typography variant="bodyRegular" sx={style.signInText}>
            Sign In
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
