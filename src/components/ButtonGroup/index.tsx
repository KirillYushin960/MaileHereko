import { Button } from '@components/Button';
import { Box, Button as MuiButton, SxProps, Theme, Typography } from '@mui/material';
import { style } from './style';

interface ButtonOptions {
  label: string;
  onClick: () => void;
}

interface IButtonGroup {
  activeValue: string;
  buttons: ButtonOptions[];
  sxStyle?: SxProps<Theme>;
}

export const ButtonGroup = ({ activeValue, buttons, sxStyle }: IButtonGroup) => (
  <Box sx={() => ({ ...style.container, ...sxStyle })}>
    {buttons.map((button) => {
      const isActive = activeValue === button.label;

      return isActive ? (
        <Button key={button.label} sxStyle={style.activeButton} onClick={button.onClick}>
          <Typography variant="linkRegular">{button.label}</Typography>
        </Button>
      ) : (
        <MuiButton key={button.label} sx={style.inactiveButton} onClick={button.onClick}>
          <Typography variant="linkRegular">{button.label}</Typography>
        </MuiButton>
      );
    })}
  </Box>
);
