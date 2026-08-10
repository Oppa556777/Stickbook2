import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import {
  AssignmentRounded,
  CheckCircleRounded,
  ScheduleRounded,
  PaymentsRounded,
  TrendingUpRounded,
} from '@mui/icons-material';
import PersonRounded from '@mui/icons-material/PersonRounded';
import { crystalGradient } from '../theme';
import AdvancedSearch from './AdvancedSearch';

const stats = [
  { label: 'Active orders', value: '128', delta: '+12 this week', icon: <AssignmentRounded />, tint: '#7c6cff' },
  { label: 'Ready for pickup', value: '23', delta: 'Pick up today', icon: <CheckCircleRounded />, tint: '#4cd9a0' },
  { label: 'Due soon', value: '17', delta: 'Next 3 days', icon: <ScheduleRounded />, tint: '#ffc24d' },
  { label: 'Pending payment', value: '₹42,850', delta: '8 invoices', icon: <PaymentsRounded />, tint: '#52d6f2' },
];

const orders = [
  { id: '#SO-2041', customer: 'Aarav Sharma', garment: 'Formal Suit', due: '12 Aug', stage: 'In progress', progress: 60, status: 'progress' },
  { id: '#SO-2040', customer: 'Mira Patel', garment: 'Sherwani', due: '15 Aug', stage: 'Measurements', progress: 30, status: 'progress' },
  { id: '#SO-2039', customer: 'Kabir Singh', garment: 'Kurta Set', due: '09 Aug', stage: 'Ready', progress: 100, status: 'ready' },
  { id: '#SO-2038', customer: 'Naina Gupta', garment: 'Blazer', due: '18 Aug', stage: 'Cutting', progress: 45, status: 'progress' },
  { id: '#SO-2037', customer: 'Rohan Mehta', garment: 'Shirt & Trousers', due: '08 Aug', stage: 'Delivered', progress: 100, status: 'done' },
];

const stageColor = (s) =>
  s === 'ready'
    ? { bg: 'rgba(76,217,160,0.14)', fg: '#4cd9a0' }
    : s === 'done'
      ? { bg: 'rgba(82,214,242,0.14)', fg: '#52d6f2' }
      : { bg: 'rgba(255,194,77,0.14)', fg: '#ffc24d' };

export default function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Hero — the advanced crystal search replaces the old pencil quick-edit slot. */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }} className="sb-fade">
        <Chip
          icon={<TrendingUpRounded />}
          label="Overview · Everything in one place"
          sx={{ mb: 1.5, bgcolor: 'rgba(124,108,255,0.14)', color: '#b7afff', border: '1px solid rgba(124,108,255,0.3)' }}
        />
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            background: crystalGradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          StitchBook Enterprise
        </Typography>
        <Typography variant="body1" sx={{ color: '#9aa0c0', mb: { xs: 3, md: 4 } }}>
          Manage orders, measurements and your tailoring workflow in one studio.
        </Typography>
        <AdvancedSearch />
      </Box>

      {/* Stat cards */}
      <Grid container spacing={{ xs: 2, md: 2.5 }} sx={{ mb: { xs: 3, md: 4 } }}>
        {stats.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={s.label} className="sb-rise" style={{ animationDelay: `${i * 0.08}s` }}>
            <Paper sx={{ p: 2.5, height: '100%', bgcolor: 'rgba(19,17,32,0.6)' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                <Avatar sx={{ bgcolor: `${s.tint}22`, color: s.tint }}>{s.icon}</Avatar>
                <Typography variant="body2" sx={{ color: '#9aa0c0' }}>
                  {s.label}
                </Typography>
              </Stack>
              <Typography variant="h5" sx={{ color: '#eef0ff' }}>
                {s.value}
              </Typography>
              <Typography variant="caption" sx={{ color: s.tint }}>
                {s.delta}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent orders */}
      <Paper sx={{ bgcolor: 'rgba(19,17,32,0.6)', overflow: 'hidden' }} className="sb-rise" style={{ animationDelay: '0.3s' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2.5, pb: 1 }}>
          <Typography variant="h6" sx={{ color: '#eef0ff' }}>
            Recent orders
          </Typography>
          <Typography variant="caption" sx={{ color: '#7c6cff', cursor: 'pointer' }}>
            View all →
          </Typography>
        </Stack>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {['Order', 'Customer', 'Garment', 'Due', 'Stage', 'Progress'].map((h) => (
                  <TableCell key={h} sx={{ color: '#6f7699', fontWeight: 700, borderColor: 'rgba(140,130,255,0.12)' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((o) => {
                const c = stageColor(o.status);
                return (
                  <TableRow key={o.id} hover sx={{ '&:hover': { bgcolor: 'rgba(124,108,255,0.06)' } }}>
                    <TableCell sx={{ color: '#c9cff2', fontWeight: 700, borderColor: 'rgba(140,130,255,0.12)' }}>
                      {o.id}
                    </TableCell>
                    <TableCell sx={{ borderColor: 'rgba(140,130,255,0.12)' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ width: 26, height: 26, fontSize: 13, bgcolor: 'rgba(124,108,255,0.25)', color: '#b7afff' }}>
                          <PersonRounded fontSize="small" />
                        </Avatar>
                        <Typography variant="body2" sx={{ color: '#eef0ff' }}>
                          {o.customer}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ color: '#9aa0c0', borderColor: 'rgba(140,130,255,0.12)' }}>{o.garment}</TableCell>
                    <TableCell sx={{ color: '#9aa0c0', borderColor: 'rgba(140,130,255,0.12)' }}>{o.due}</TableCell>
                    <TableCell sx={{ borderColor: 'rgba(140,130,255,0.12)' }}>
                      <Chip size="small" label={o.stage} sx={{ bgcolor: c.bg, color: c.fg, fontWeight: 700 }} />
                    </TableCell>
                    <TableCell sx={{ borderColor: 'rgba(140,130,255,0.12)', minWidth: 120 }}>
                      <Stack spacing={0.5}>
                        <LinearProgress
                          variant="determinate"
                          value={o.progress}
                          sx={{ borderRadius: 99, height: 6, bgcolor: 'rgba(124,108,255,0.12)', '& .MuiLinearProgress-bar': { background: c.fg } }}
                        />
                        <Typography variant="caption" sx={{ color: '#6f7699' }}>
                          {o.progress}%
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
