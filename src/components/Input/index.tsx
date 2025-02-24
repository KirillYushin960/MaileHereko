import { ChangeEvent, useRef } from 'react';
import { TextField, Box, SxProps, Theme } from '@mui/material';
import { style } from './style';

interface Input {
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  startIcon?: string;
  endIcon?: string;
  type?: string;
  error?: boolean;
  helperText?: string;
  endIconClick?: () => void;
  sxStyle?: SxProps<Theme>;
  endIconStyle?: SxProps<Theme>;
}

export const Input = ({
  value,
  onChange,
  label,
  startIcon,
  endIcon,
  type,
  error,
  helperText,
  endIconClick,
  endIconStyle,
  sxStyle,
}: Input) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBoxClick = () => {
    inputRef.current?.focus();
  };

  return (
    <Box sx={() => ({ ...style.inputBox, ...sxStyle })} onClick={handleBoxClick}>
      {startIcon && <Box component="img" src={startIcon} draggable="false" alt="start icon" />}

      <TextField
        value={value}
        label={label}
        onChange={onChange}
        variant="filled"
        sx={style.input}
        autoComplete="off"
        type={type}
        error={error}
        helperText={helperText}
        inputRef={inputRef}
      />

      {endIcon && (
        <Box
          component="img"
          onClick={endIconClick}
          src={endIcon}
          draggable="false"
          alt="end icon"
          sx={endIconStyle}
        />
      )}
    </Box>
  );
};
