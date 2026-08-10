import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@mui/material';
import { crystalGradient } from '../theme';

const GARMENTS = ['Formal Suit', 'Sherwani', 'Kurta Set', 'Shirt & Trousers', 'Blazer', 'Waistcoat'];

export default function NewOrderDialog({ open, onClose }) {
  const [step, setStep] = useState(0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: '#151229',
          backgroundImage: 'none',
          borderRadius: 4,
          border: '1px solid rgba(124,108,255,0.25)',
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          background: crystalGradient,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 800,
        }}
      >
        New Order
      </DialogTitle>

      <Stepper activeStep={step} alternativeLabel sx={{ px: 3, py: 1.5 }}>
        {['Customer', 'Garment & Fit', 'Measurements', 'Review'].map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <DialogContent>
        {step === 0 && (
          <Stack spacing={2}>
            <TextField label="Customer name" fullWidth />
            <TextField label="Phone number" fullWidth />
            <TextField label="Notes" fullWidth multiline rows={2} />
          </Stack>
        )}
        {step === 1 && (
          <Stack spacing={2}>
            <TextField select label="Garment type" defaultValue="Formal Suit" fullWidth>
              {GARMENTS.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </TextField>
            <TextField select label="Fit" defaultValue="Regular" fullWidth>
              {['Slim', 'Regular', 'Comfort'].map((f) => (
                <MenuItem key={f} value={f}>
                  {f}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Due date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
          </Stack>
        )}
        {step === 2 && (
          <Stack spacing={2}>
            <TextField label="Chest (in)" fullWidth />
            <TextField label="Waist (in)" fullWidth />
            <TextField label="Sleeve (in)" fullWidth />
            <TextField label="Length (in)" fullWidth />
          </Stack>
        )}
        {step === 3 && (
          <Stack spacing={1} sx={{ color: '#c9cff2', pt: 1 }}>
            <ReviewRow k="Customer" v="—" />
            <ReviewRow k="Garment" v="—" />
            <ReviewRow k="Priority" v="Standard" />
            <ReviewRow k="Status" v="In progress" />
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ color: '#9aa0c0' }}>
          Cancel
        </Button>
        {step < 3 && (
          <Button variant="contained" onClick={() => setStep((s) => s + 1)} sx={{ background: crystalGradient, color: '#0b0a14' }}>
            Next
          </Button>
        )}
        {step === 3 && (
          <Button variant="contained" onClick={onClose} sx={{ background: crystalGradient, color: '#0b0a14' }}>
            Create order
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

function ReviewRow({ k, v }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography component="span" variant="body2" sx={{ color: '#6f7699' }}>
        {k}
      </Typography>
      <Typography component="span" variant="body2" sx={{ fontWeight: 700, color: '#eef0ff' }}>
        {v}
      </Typography>
    </Stack>
  );
}

