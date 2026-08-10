import { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Slider,
  FormControlLabel,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import StorefrontRounded from '@mui/icons-material/StorefrontRounded';
import ShoppingBagRounded from '@mui/icons-material/ShoppingBagRounded';
import PeopleRounded from '@mui/icons-material/PeopleRounded';
import StyleRounded from '@mui/icons-material/StyleRounded';
import ReceiptRounded from '@mui/icons-material/ReceiptRounded';
import ColorLensRounded from '@mui/icons-material/ColorLensRounded';
import TuneRounded from '@mui/icons-material/TuneRounded';
import NotificationsRounded from '@mui/icons-material/NotificationsRounded';
import CloudRounded from '@mui/icons-material/CloudRounded';
import SecurityRounded from '@mui/icons-material/SecurityRounded';
import SaveRounded from '@mui/icons-material/SaveRounded';
import { crystalGradient } from '../theme';

const GROUPS = [
  {
    id: 'shop',
    icon: <StorefrontRounded />,
    title: 'Shop Profile',
    desc: 'Business identity & currency',
    panel: 'shop',
  },
  {
    id: 'workflow',
    icon: <TuneRounded />,
    title: 'Workflow',
    desc: 'Order flow, stages & defaults',
    panel: 'workflow',
  },
  {
    id: 'notifications',
    icon: <NotificationsRounded />,
    title: 'Notifications',
    desc: 'Alerts for orders & reminders',
    panel: 'notifications',
  },
  {
    id: 'appearance',
    icon: <ColorLensRounded />,
    title: 'Appearance',
    desc: 'Theme, accent & compact mode',
    panel: 'appearance',
  },
  {
    id: 'data',
    icon: <CloudRounded />,
    title: 'Data & Backup',
    desc: 'Cloud sync, export & restore',
    panel: 'data',
  },
  {
    id: 'security',
    icon: <SecurityRounded />,
    title: 'Security',
    desc: 'Roles, permissions & privacy',
    panel: 'security',
  },
];

const shopFields = [
  { icon: <ShoppingBagRounded />, label: 'Business name', value: 'StitchBook Studio' },
  { icon: <PeopleRounded />, label: 'Tailors on staff', value: '8' },
  { icon: <StyleRounded />, label: 'Default garment type', value: 'Formal Suit' },
  { icon: <ReceiptRounded />, label: 'Tax rate (%)', value: '12' },
];

/**
 * Settings drawer — a single wider entry point (Settings pill in the nav bar)
 * that opens an organised, grouped settings area instead of a bare popover.
 */
export default function SettingsDrawer({ open, onClose }) {
  const [active, setActive] = useState('shop');
  const [toggles, setToggles] = useState({
    orderAlerts: true,
    deliveryReminders: true,
    weeklyReport: false,
    cloudSync: true,
    autoBackup: true,
    compactMode: false,
  });
  const [radius, setRadius] = useState(14);
  const [accent, setAccent] = useState('crystal');

  const toggle = (key) => setToggles((t) => ({ ...t, [key]: !t[key] }));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '92vw', sm: 460 }, bgcolor: '#131120' } }}
    >
      <Box sx={{ p: 2.5, background: crystalGradient }}>
        <Typography variant="h6" sx={{ color: '#0b0a14', fontWeight: 800 }}>
          Settings
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(11,10,20,0.7)' }}>
          StitchBook Enterprise v2 — organised controls
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', height: '100%' }}>
        {/* Grouped settings categories */}
        <Box sx={{ width: 220, borderRight: '1px solid rgba(140,130,255,0.12)', py: 1 }}>
          <List dense disablePadding>
            {GROUPS.map((g) => {
              const selected = active === g.panel;
              return (
                <ListItemButton
                  key={g.id}
                  selected={selected}
                  onClick={() => setActive(g.panel)}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    my: 0.25,
                    '&.Mui-selected': {
                      background: 'rgba(124,108,255,0.16)',
                      '&:hover': { background: 'rgba(124,108,255,0.22)' },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: selected ? '#a78bfa' : '#9aa0c0', minWidth: 36 }}>
                    {g.icon}
                  </ListItemIcon>
                  <Box>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {g.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" sx={{ color: '#6f7699' }}>
                          {g.desc}
                        </Typography>
                      }
                    />
                  </Box>
                </ListItemButton>
              );
            })}
          </List>
        </Box>

        {/* Active panel */}
        <Box sx={{ flex: 1, p: 2.5, overflowY: 'auto' }}>
          {active === 'shop' && (
            <>
              <SectionTitle>Shop Profile</SectionTitle>
              {shopFields.map((f) => (
                <FieldRow key={f.label} icon={f.icon} label={f.label} value={f.value} />
              ))}
            </>
          )}

          {active === 'workflow' && (
            <>
              <SectionTitle>Workflow</SectionTitle>
              <ToggleRow
                label="Order alerts"
                sub="Toast when a new order arrives"
                checked={toggles.orderAlerts}
                onChange={() => toggle('orderAlerts')}
              />
              <ToggleRow
                label="Delivery reminders"
                sub="Remind before due dates"
                checked={toggles.deliveryReminders}
                onChange={() => toggle('deliveryReminders')}
              />
              <ToggleRow
                label="Weekly report"
                sub="Email a summary every Monday"
                checked={toggles.weeklyReport}
                onChange={() => toggle('weeklyReport')}
              />
            </>
          )}

          {active === 'notifications' && (
            <>
              <SectionTitle>Notifications</SectionTitle>
              <ToggleRow
                label="Push notifications"
                sub="Live updates on your device"
                checked
                onChange={() => {}}
              />
              <ToggleRow
                label="Email digest"
                sub="Daily summary of activity"
                checked={toggles.weeklyReport}
                onChange={() => toggle('weeklyReport')}
              />
            </>
          )}

          {active === 'appearance' && (
            <>
              <SectionTitle>Appearance</SectionTitle>
              <Typography variant="caption" sx={{ color: '#6f7699' }}>
                Corner radius
              </Typography>
              <Slider
                value={radius}
                min={6}
                max={28}
                onChange={(_, v) => setRadius(v)}
                valueLabelDisplay="auto"
                sx={{ color: '#7c6cff' }}
              />
              <Typography variant="caption" sx={{ color: '#6f7699' }}>
                Accent
              </Typography>
              <Stack direction="row" spacing={1} sx={{ my: 1.5 }}>
                {[
                  ['crystal', 'linear-gradient(135deg,#7c6cff,#52d6f2)'],
                  ['mint', 'linear-gradient(135deg,#4cd9a0,#52d6f2)'],
                  ['ember', 'linear-gradient(135deg,#ff7a6b,#ffc24d)'],
                ].map(([key, grad]) => (
                  <Button
                    key={key}
                    size="small"
                    onClick={() => setAccent(key)}
                    sx={{
                      background: grad,
                      borderRadius: 2,
                      minWidth: 56,
                      height: 32,
                      color: '#0b0a14',
                      border: accent === key ? '2px solid #ffffff' : 'none',
                      textTransform: 'capitalize',
                    }}
                  >
                    {key}
                  </Button>
                ))}
              </Stack>
              <ToggleRow
                label="Compact mode"
                sub="Denser cards & spacing"
                checked={toggles.compactMode}
                onChange={() => toggle('compactMode')}
              />
            </>
          )}

          {active === 'data' && (
            <>
              <SectionTitle>Data & Backup</SectionTitle>
              <ToggleRow
                label="Cloud sync"
                sub="Sync orders across devices"
                checked={toggles.cloudSync}
                onChange={() => toggle('cloudSync')}
              />
              <ToggleRow
                label="Auto backup"
                sub="Nightly snapshot to cloud"
                checked={toggles.autoBackup}
                onChange={() => toggle('autoBackup')}
              />
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button variant="outlined" size="small">
                  Export
                </Button>
                <Button variant="outlined" size="small">
                  Restore
                </Button>
              </Stack>
            </>
          )}

          {active === 'security' && (
            <>
              <SectionTitle>Security</SectionTitle>
              <Chip
                size="small"
                label="2 staff admins · 6 tailors"
                variant="outlined"
                sx={{ mb: 2, color: '#b7afff', borderColor: 'rgba(124,108,255,0.4)' }}
              />
              <ToggleRow
                label="Require PIN to open"
                sub="Extra layer on this device"
                checked
                onChange={() => {}}
              />
            </>
          )}

          <Divider sx={{ my: 2.5 }} />
          <Button
            variant="contained"
            fullWidth
            startIcon={<SaveRounded />}
            onClick={onClose}
            sx={{ background: crystalGradient, color: '#0b0a14' }}
          >
            Save settings
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

function SectionTitle({ children }) {
  return (
    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, color: '#eef0ff' }}>
      {children}
    </Typography>
  );
}

function FieldRow({ icon, label, value }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ py: 1 }}>
      <Box sx={{ color: '#7c6cff', display: 'flex' }}>{icon}</Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ color: '#c9cff2' }}>
          {label}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: '#eef0ff', fontWeight: 700 }}>
        {value}
      </Typography>
    </Stack>
  );
}

function ToggleRow({ label, sub, checked, onChange }) {
  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={onChange} sx={{ color: '#7c6cff' }} />}
      label={
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#eef0ff' }}>
            {label}
          </Typography>
          <Typography variant="caption" sx={{ color: '#6f7699' }}>
            {sub}
          </Typography>
        </Box>
      }
      sx={{ width: '100%', my: 0.5, mx: 0 }}
    />
  );
}
