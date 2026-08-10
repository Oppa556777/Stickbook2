import { useEffect, useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import InstallDesktopRounded from '@mui/icons-material/InstallDesktopRounded';
import MobileFriendlyRounded from '@mui/icons-material/MobileFriendlyRounded';

let deferredPrompt = null;

/**
 * "Install app" button backed by the browser's PWA install prompt
 * (beforeinstallprompt). On iOS/Safari (no beforeinstallprompt) it shows
 * guidance to use "Add to Home Screen".
 */
export default function InstallApp() {
  const [canInstall, setCanInstall] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setCanInstall(true);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;
      setCanInstall(false);
    });
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
    };
  }, []);

  const handleClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice.catch(() => null);
      deferredPrompt = null;
      setCanInstall(false);
      void choice;
    } else {
      setGuideOpen(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        startIcon={canInstall ? <InstallDesktopRounded /> : <MobileFriendlyRounded />}
        sx={{
          color: '#c9cff2',
          borderColor: 'rgba(140,130,255,0.3)',
          borderRadius: '999px',
          px: 2,
          whiteSpace: 'nowrap',
          '&:hover': {
            borderColor: '#7c6cff',
            background: 'rgba(124,108,255,0.12)',
          },
        }}
      >
        Install app
      </Button>
      <Snackbar
        open={guideOpen}
        autoHideDuration={6000}
        onClose={() => setGuideOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" onClose={() => setGuideOpen(false)} sx={{ width: '100%' }}>
          To install on your phone/tablet: open this page in the browser menu →
          <strong> “Add to Home Screen”</strong>.
        </Alert>
      </Snackbar>
    </>
  );
}
