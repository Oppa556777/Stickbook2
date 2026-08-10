import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Stack,
  IconButton,
  Tooltip,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';
import NotificationsNoneRounded from '@mui/icons-material/NotificationsNoneRounded';
import BoltRounded from '@mui/icons-material/BoltRounded';
import { crystalGradient } from '../theme';
import SettingsDrawer from './SettingsDrawer';
import NewOrderDialog from './NewOrderDialog';

const LogoMark = () => (
  <Box
    sx={{
      width: 40,
      height: 40,
      borderRadius: '12px',
      background: crystalGradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 24px rgba(124,108,255,0.45)',
      fontWeight: 900,
      fontSize: 20,
      color: '#0b0a14',
      flexShrink: 0,
    }}
  >
    S
  </Box>
);

/**
 * Top navigation bar for StitchBook Enterprise v2.
 *
 * Deliberately excludes:
 *  - the lock icon (homepage top-left)
 *  - the "Royal Tailors and Drapers" brand name
 *  - the pencil icon
 * The primary action ("New Order") lives here, centered, instead of on the page.
 */
export default function NavBar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: 'blur(14px)',
          background: 'rgba(11, 10, 20, 0.72)',
          borderBottom: '1px solid rgba(140, 130, 255, 0.14)',
        }}
      >
        <Toolbar sx={{ minHeight: 72, gap: { xs: 1, md: 2 }, px: { xs: 1.5, md: 3 } }}>
          {/* Left — logo mark only (no lock, no brand name). */}
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }}>
            <LogoMark />
            {isDesktop && (
              <Chip
                icon={<BoltRounded />}
                label="Enterprise v2"
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'rgba(124,108,255,0.4)',
                  color: '#b7afff',
                  '.MuiChip-icon': { color: '#7c6cff' },
                }}
              />
            )}
          </Stack>

          {/* Center — New Order lives here, not on the homepage. */}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineRounded />}
              onClick={() => setOrderOpen(true)}
              sx={{
                background: crystalGradient,
                color: '#0b0a14',
                px: { xs: 2, md: 3.5 },
                py: 1.15,
                fontSize: 15,
                animation: 'sb-pulse 3.2s ease-in-out infinite',
                '@keyframes sb-pulse': {
                  '0%,100%': { boxShadow: '0 0 0 0 rgba(124,108,255,0.55)' },
                  '50%': { boxShadow: '0 0 0 10px rgba(124,108,255,0)' },
                },
              }}
            >
              New Order
            </Button>
          </Box>

          {/* Right — notifications + wider Settings button. */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ flexGrow: 1, justifyContent: 'flex-end' }}
          >
            <Tooltip title="Notifications">
              <IconButton
                aria-label="Notifications"
                sx={{ color: '#9aa0c0', '&:hover': { color: '#eef0ff' } }}
              >
                <NotificationsNoneRounded />
              </IconButton>
            </Tooltip>

            <Tooltip title="Open settings">
              <Button
                aria-label="Settings"
                variant="text"
                startIcon={<SettingsRounded />}
                onClick={() => setSettingsOpen(true)}
                sx={{
                  // Wider settings control with grouped, organised features behind it.
                  color: '#c9cff2',
                  border: '1px solid rgba(140, 130, 255, 0.22)',
                  borderRadius: '999px',
                  px: { xs: 2, md: 3 },
                  py: 1.05,
                  minWidth: { xs: 64, md: 128 },
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    background: 'rgba(124,108,255,0.12)',
                    borderColor: 'rgba(124,108,255,0.5)',
                    color: '#ffffff',
                  },
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Settings
                </Box>
              </Button>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <NewOrderDialog open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
