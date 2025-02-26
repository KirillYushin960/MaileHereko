import { MouseEventHandler, ReactNode } from 'react';
import { Box, Button as MUIButton, SxProps, Theme, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { style } from './style';

interface IButtonProps {
  children: ReactNode;
  startIcon?: string;
  endIcon?: string;
  sxStyle?: SxProps<Theme>;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: 'button' | 'submit' | 'reset';
  component?: 'button' | typeof Link;
  to?: string;
}

export const Button = ({
  startIcon,
  endIcon,
  sxStyle,
  disabled,
  onClick,
  component = 'button',
  to,
  children,
  type = 'button',
}: IButtonProps) => {
  const isLink = component === Link;

  return (
    <MUIButton
      disableRipple
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      sx={() => ({ ...style.button, ...sxStyle })}
      startIcon={
        startIcon && <Box component="img" src={startIcon} draggable="false" alt="start icon" />
      }
      endIcon={endIcon && <Box component="img" src={endIcon} draggable="false" alt="end icon" />}
      component={isLink ? Link : component}
      to={isLink ? to : undefined}
      type={!isLink ? type : undefined}
    >
      <Typography variant="bodyRegular" sx={style.text}>
        {children}
      </Typography>
    </MUIButton>
  );
};
