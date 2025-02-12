import { MouseEventHandler, ReactNode } from 'react';
import { Button as MUIButton, SxProps, Theme, Typography } from '@mui/material';
import { style } from './style';

interface IButton {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  startIcon?: string;
  endIcon?: string;
  sxStyle?: SxProps<Theme>;
  disabled?: boolean;
}

export const Button = ({ startIcon, endIcon, sxStyle, disabled, onClick, children }: IButton) => (
  <MUIButton
    disableRipple
    variant="contained"
    disabled={disabled}
    onClick={onClick}
    sx={() => ({ ...style.button, ...sxStyle })}
    startIcon={startIcon && <img src={startIcon} draggable="false" alt="start icon" />}
    endIcon={endIcon && <img src={endIcon} draggable="false" alt="end icon" />}
  >
    <Typography variant="bodyRegular" sx={style.text}>
      {children}
    </Typography>
  </MUIButton>
);
