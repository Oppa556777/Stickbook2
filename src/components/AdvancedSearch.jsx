import { useState } from 'react';
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Chip,
  Popover,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';
import TuneRounded from '@mui/icons-material/TuneRounded';
import FilterAltRounded from '@mui/icons-material/FilterAltRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { crystalGradient } from '../theme';

/**
 * Advanced search bar. Replaces the former "pencil" quick-edit control.
 * Renders a glowing, crystalline field with animated crystal shards,
 * plus an advanced filter fly-out. Purely search-based — no AI search.
 */
export default function AdvancedSearch() {
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeFilters, setActiveFilters] = useState([
    'In progress',
    'Priority',
  ]);

  const filters = [
    'In progress',
    'Ready',
    'Delivered',
    'Priority',
    'Paid',
    'Due soon',
  ];

  const toggleFilter = (f) =>
    setActiveFilters((cur) =>
      cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]
    );

  return (
    <Box sx={{ position: 'relative', maxWidth: 760, mx: 'auto', width: '100%' }}>
      {/* Floating crystal shards / sparkles */}
      <Box className="crystal-spark" sx={{ top: -18, left: -10 }} />
      <Box className="crystal-spark" sx={{ top: 6, right: -8, animationDelay: '1.2s' }} />
      <Box className="crystal-spark" sx={{ bottom: -14, left: 30, animationDelay: '0.6s' }} />
      <Box className="crystal-spark" sx={{ top: -6, left: '55%', animationDelay: '0.3s' }} />

      {/* Glowing crystal frame */}
      <Box
        sx={{
          position: 'relative',
          borderRadius: '22px',
          padding: '2px',
          background:
            'linear-gradient(135deg, rgba(124,108,255,0.95), rgba(82,214,242,0.95), rgba(167,139,250,0.95))',
          backgroundSize: '300% 300%',
          animation: 'sb-crystalflow 6s ease infinite',
          boxShadow:
            '0 0 22px rgba(124,108,255,0.55), 0 0 60px rgba(82,214,242,0.28), inset 0 0 14px rgba(124,108,255,0.35)',
          '@keyframes sb-crystalflow': {
            '0%,100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
          },
        }}
      >
        <Box
          sx={{
            borderRadius: '20px',
            bgcolor: 'rgba(16,14,30,0.92)',
            backdropFilter: 'blur(10px)',
            px: { xs: 1.5, md: 2 },
            py: 1,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton aria-label="Search" sx={{ color: '#7c6cff' }}>
              <SearchRounded />
            </IconButton>

            <TextField
              fullWidth
              variant="standard"
              placeholder="Search orders, customers, garments, measurements…"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              InputProps={{
                disableUnderline: true,
                endAdornment: value && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setValue('')} sx={{ color: '#6f7699' }}>
                      <CloseRounded fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { fontSize: 16, color: '#eef0ff' } }}
              sx={{ '& input::placeholder': { color: '#6f7699' } }}
            />

            <Button
              variant="contained"
              startIcon={<FilterAltRounded />}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                background: crystalGradient,
                color: '#0b0a14',
                borderRadius: '999px',
                px: { xs: 1.5, md: 2.5 },
                whiteSpace: 'nowrap',
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Advanced
              </Box>
            </Button>
          </Stack>

          {activeFilters.length > 0 && (
            <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ pt: 0.5, pb: 0.25 }}>
              {activeFilters.map((f) => (
                <Chip
                  key={f}
                  label={f}
                  size="small"
                  onDelete={() => toggleFilter(f)}
                  sx={{
                    bgcolor: 'rgba(124,108,255,0.14)',
                    color: '#b7afff',
                    border: '1px solid rgba(124,108,255,0.3)',
                  }}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Box>

      {/* Advanced filter popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { bgcolor: '#17142a', width: 280, p: 2, mt: 1 } }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 800 }}>
          <TuneRounded sx={{ verticalAlign: 'middle', mr: 0.5, color: '#7c6cff' }} />
          Advanced filters
        </Typography>
        <FormGroup>
          {filters.map((f) => (
            <FormControlLabel
              key={f}
              control={
                <Checkbox
                  size="small"
                  checked={activeFilters.includes(f)}
                  onChange={() => toggleFilter(f)}
                  sx={{ color: '#7c6cff' }}
                />
              }
              label={<Typography variant="body2">{f}</Typography>}
            />
          ))}
        </FormGroup>
      </Popover>
    </Box>
  );
}
