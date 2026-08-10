import { createTheme } from '@mui/material/styles';

// StitchBook Enterprise v2 — "crystal" dark theme.
// Material UI v9 uses CSS theme variables when <CssBaseline enableColorScheme />
// is active; both palettes are supplied for a resilient light/dark experience.
export const crystalGradient =
  'linear-gradient(135deg, #7c6cff 0%, #52d6f2 55%, #a78bfa 100%)';

export const palette = {
  mode: 'dark',
  primary: { main: '#7c6cff', light: '#a78bfa', dark: '#5b4ad9' },
  secondary: { main: '#52d6f2', light: '#8ceaff', dark: '#2aa7c9' },
  background: {
    default: '#0b0a14',
    paper: '#131120',
    paper2: '#191730',
  },
  text: {
    primary: '#eef0ff',
    secondary: '#9aa0c0',
  },
  divider: 'rgba(140, 130, 255, 0.14)',
  error: { main: '#ff6b8a' },
  success: { main: '#4cd9a0' },
  warning: { main: '#ffc24d' },
};

export default createTheme({
  palette,
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: `'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'radial-gradient(1200px 600px at 15% -10%, rgba(124,108,255,0.18), transparent 60%),' +
            'radial-gradient(1000px 500px at 90% 0%, rgba(82,214,242,0.14), transparent 55%),' +
            '#0b0a14',
          minHeight: '100vh',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(140, 130, 255, 0.12)',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12, fontWeight: 700 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
});
