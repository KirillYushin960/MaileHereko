import { ChangeEvent, useRef } from 'react';
import { TextField, Box, SxProps, Theme } from '@mui/material';
import { style } from './style';

interface Input {
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  startIcon?: string;
  endIcon?: string;
  sxStyle?: SxProps<Theme>;
}

export const Input = ({ value, onChange, label, startIcon, endIcon, sxStyle }: Input) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Box
      sx={() => ({
        ...style.inputBox,
        ...sxStyle,
      })}
      onMouseDown={handleBoxClick}
    >
      {startIcon && <img src={startIcon} draggable="false" alt="start icon" />}

      <TextField
        value={value}
        label={label}
        onChange={onChange}
        inputRef={inputRef}
        variant="filled"
        sx={style.input}
        autoComplete="off"
      />

      {endIcon && <img src={endIcon} draggable="false" alt="end icon" />}
    </Box>
  );
};
