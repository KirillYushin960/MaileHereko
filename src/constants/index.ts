import { ColorPartial } from '@mui/material/styles/createPalette';
import { OpacityColors } from '@types';

export const projectName = 'MaileHereko';

export const content = ['All', 'Anime', 'Manga'] as const;

export const cardPerPage = 20;

export const charLimit = 300;

export const filterInitialState = {
  inputValue: '',
};

export const emailRegex =
  /^(?!\.)[^\s@!"#$%&'()*+,/:;<=>?[\\\]^{|}~]+(?:\.[^\s@!"#$%&'()*+,/:;<=>?[\\\]^{|}~]+)*@(?!-)[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

export const customPrimary: ColorPartial = {
  900: '#120F31',
  800: '#251E62',
  700: '#362C92',
  600: '#483BC3',
  500: '#5A4AF4',
  400: '#7B6EF6',
  300: '#9C92F8',
  200: '#BEB7FB',
  100: '#DEDBFD',
  50: '#EBE9FE',
};

export const customSecondary: ColorPartial = {
  900: '#062032',
  800: '#0C4265',
  700: '#126297',
  600: '#1884CA',
  500: '#1EA5FC',
  400: '#4BB7FD',
  300: '#78C8FD',
  200: '#A5DBFE',
  100: '#D2ECFE',
  50: '#E4F4FF',
};

export const customTertiary: ColorPartial = {
  900: '#241633',
  800: '#492C66',
  700: '#6D4199',
  600: '#9257CC',
  500: '#B66DFF',
  400: '#C58AFF',
  300: '#D3A7FF',
  200: '#E2C5FF',
  100: '#F0E2FF',
  50: '#F6EDFF',
};

export const customSuccess: ColorPartial = {
  900: '#01291D',
  800: '#02523A',
  700: '#037C57',
  600: '#04A574',
  500: '#05CE91',
  400: '#37D8A7',
  300: '#69E2BD',
  200: '#9BEBD3',
  100: '#CDF5E9',
  50: '#E1F9F2',
};

export const customError: ColorPartial = {
  900: '#331313',
  800: '#662727',
  700: '#993A3A',
  600: '#CC4E4E',
  500: '#FF6161',
  400: '#FF8181',
  300: '#FFA0A0',
  200: '#FFC0C0',
  100: '#FFDFDF',
  50: '#FFECEC',
};

export const customWarning: ColorPartial = {
  900: '#33230F',
  800: '#66451D',
  700: '#99682C',
  600: '#CC8A3A',
  500: '#FFAD49',
  400: '#FFBD6D',
  300: '#FFCE92',
  200: '#FFDEB6',
  100: '#FFEFDB',
  50: '#FFF5E9',
};

export const customGray: ColorPartial = {
  900: '#121829',
  800: '#20283E',
  700: '#323B54',
  600: '#475069',
  500: '#61697F',
  400: '#767E94',
  300: '#8E95A9',
  200: '#A8AEBF',
  100: '#C3C8D4',
  50: '#EBEEF5',
};

export const customWhite: OpacityColors = {
  100: '#FFFFFF',
  75: '#FFFFFFBF',
  65: '#FFFFFFA6',
  50: '#FFFFFF80',
  40: '#FFFFFF66',
  30: '#FFFFFF4D',
  20: '#FFFFFF33',
  10: '#FFFFFF1A',
};

export const customBlack: OpacityColors = {
  100: '#000000',
  75: '#000000BF',
  65: '#000000A6',
  50: '#00000080',
  40: '#00000066',
  30: '#0000004D',
  20: '#00000033',
  10: '#0000001A',
};
