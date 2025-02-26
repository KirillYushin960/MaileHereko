import { ChangeEvent, useRef, MouseEvent } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const isUserInteraction = useRef(false);

  const handleContainerMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const input = inputRef.current;
    if (!input) return;

    const isInputClicked = input.contains(e.target as Node);

    if (!isInputClicked) {
      isUserInteraction.current = true;

      requestAnimationFrame(() => {
        input.focus();
        const length = input.value.length;
        input.setSelectionRange(length, length);
        isUserInteraction.current = false;
      });
    }
  };

  return (
    <Box sx={() => ({ ...style.inputBox, ...sxStyle })} onMouseDown={handleContainerMouseDown}>
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
        onFocus={(e) => {
          if (!isUserInteraction.current) {
            const length = e.target.value.length;
            e.target.setSelectionRange(length, length);
          }
        }}
      />

      {endIcon && (
        <Box
          component="img"
          onClick={endIconClick}
          onMouseUp={(e: MouseEvent<HTMLImageElement>) => e.preventDefault()}
          src={endIcon}
          draggable="false"
          alt="end icon"
          sx={endIconStyle}
        />
      )}
    </Box>
  );
};
