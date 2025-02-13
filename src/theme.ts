import { createTheme } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';
import { OpacityColors } from '@types';
import {
  customPrimary,
  customSecondary,
  customTertiary,
  customBlack,
  customError,
  customGray,
  customSuccess,
  customWarning,
  customWhite,
} from './constants';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    customPrimary: ColorPartial;
    customSecondary: ColorPartial;
    customTertiary: ColorPartial;
    customSuccess: ColorPartial;
    customError: ColorPartial;
    customWarning: ColorPartial;
    customGray: ColorPartial;
    customWhite: OpacityColors;
    customBlack: OpacityColors;
  }

  interface Palette {
    customPrimary: ColorPartial;
    customSecondary: ColorPartial;
    customTertiary: ColorPartial;
    customSuccess: ColorPartial;
    customError: ColorPartial;
    customWarning: ColorPartial;
    customGray: ColorPartial;
    customWhite: OpacityColors;
    customBlack: OpacityColors;
  }

  interface TypographyVariants {
    bodyLarge: TypographyStyleOptions;
    bodyRegular: TypographyStyleOptions;
    bodySmall: TypographyStyleOptions;
    bodyExtraSmall: TypographyStyleOptions;
    overlineRegular: TypographyStyleOptions;
    overlineSmall: TypographyStyleOptions;
    linkRegular: TypographyStyleOptions;
    linkSmall: TypographyStyleOptions;
    linkExtraSmall: TypographyStyleOptions;
  }

  interface TypographyVariantsOptions {
    bodyLarge: TypographyStyleOptions;
    bodyRegular: TypographyStyleOptions;
    bodySmall: TypographyStyleOptions;
    bodyExtraSmall: TypographyStyleOptions;
    overlineRegular: TypographyStyleOptions;
    overlineSmall: TypographyStyleOptions;
    linkRegular: TypographyStyleOptions;
    linkSmall: TypographyStyleOptions;
    linkExtraSmall: TypographyStyleOptions;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodyLarge: true;
    bodyRegular: true;
    bodySmall: true;
    bodyExtraSmall: true;
    overlineRegular: true;
    overlineSmall: true;
    linkRegular: true;
    linkSmall: true;
    linkExtraSmall: true;
  }

  interface ButtonPropsVariantOverrides {
    linkRegular: true;
    linkSmall: true;
    linkExtraSmall: true;
  }
}

export const theme = createTheme({
  palette: {
    customPrimary,
    customSecondary,
    customTertiary,
    customSuccess,
    customError,
    customWarning,
    customGray,
    customWhite,
    customBlack,
  },

  components: {
    MuiGrid2: {
      defaultProps: {
        rowSpacing: 2.5,
        columnSpacing: 3,
        container: true,
        mb: '64px',
      },

      styleOverrides: {
        root: {
          maxWidth: '1200px',
          justifyContent: 'space-evenly',
        },
      },
    },

    MuiToolbar: {
      defaultProps: {
        disableGutters: true,
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
  },

  typography: {
    h1: {
      fontFamily: 'Poppins',
      fontSize: '64px',
      lineHeight: '80px',
      letterSpacing: '-0.02em',
      fontWeight: 600,
    },

    h2: {
      fontFamily: 'Poppins',
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: '-0.02em',
      fontWeight: 600,
    },

    h3: {
      fontFamily: 'Poppins',
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: '-0.02em',
      fontWeight: 600,
    },

    h4: {
      fontFamily: 'Poppins',
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.015em',
      fontWeight: 700,
    },

    h5: {
      fontFamily: 'Poppins',
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '-0.015em',
      fontWeight: 700,
    },

    h6: {
      fontFamily: 'Poppins',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '-0.015em',
      fontWeight: 700,
    },

    bodyLarge: {
      fontFamily: 'Poppins',
      fontSize: '20px',
      lineHeight: '32px',
      fontWeight: 400,
    },

    bodyRegular: {
      fontFamily: 'Poppins',
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
    },

    bodySmall: {
      fontFamily: 'Poppins',
      fontSize: '14px',
      lineHeight: '24px',
      fontWeight: 400,
    },

    bodyExtraSmall: {
      fontFamily: 'Poppins',
      fontSize: '12px',
      lineHeight: '24px',
      fontWeight: 400,
    },

    caption: {
      fontFamily: 'Poppins',
      fontSize: '14px',
      lineHeight: '16px',
      fontWeight: 400,
    },

    overlineRegular: {
      fontFamily: 'Poppins',
      fontSize: '14px',
      lineHeight: '24px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
    },

    overlineSmall: {
      fontFamily: 'Poppins',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
    },

    linkRegular: {
      fontFamily: 'Poppins',
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },

    linkSmall: {
      fontFamily: 'Poppins',
      fontSize: '14px',
      lineHeight: '24px',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },

    linkExtraSmall: {
      fontFamily: 'Poppins',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
});
