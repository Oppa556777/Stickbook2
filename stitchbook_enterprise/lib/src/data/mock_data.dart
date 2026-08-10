import 'package:flutter/material.dart';
import '../models/order.dart';

const stats = [
  StatCard(
    label: 'Active orders',
    value: '128',
    delta: '+12 this week',
    icon: Icons.assignment_rounded,
    tint: Color(0xFF7C6CFF),
  ),
  StatCard(
    label: 'Ready for pickup',
    value: '23',
    delta: 'Pick up today',
    icon: Icons.check_circle_rounded,
    tint: Color(0xFF4CD9A0),
  ),
  StatCard(
    label: 'Due soon',
    value: '17',
    delta: 'Next 3 days',
    icon: Icons.schedule_rounded,
    tint: Color(0xFFFFC24D),
  ),
  StatCard(
    label: 'Pending payment',
    value: '₹42,850',
    delta: '8 invoices',
    icon: Icons.payments_rounded,
    tint: Color(0xFF52D6F2),
  ),
];

const orders = [
  Order(
    id: '#SO-2041',
    customer: 'Aarav Sharma',
    garment: 'Formal Suit',
    due: '12 Aug',
    stage: OrderStage.inProgress,
    progress: 60,
  ),
  Order(
    id: '#SO-2040',
    customer: 'Mira Patel',
    garment: 'Sherwani',
    due: '15 Aug',
    stage: OrderStage.measurements,
    progress: 30,
  ),
  Order(
    id: '#SO-2039',
    customer: 'Kabir Singh',
    garment: 'Kurta Set',
    due: '09 Aug',
    stage: OrderStage.ready,
    progress: 100,
  ),
  Order(
    id: '#SO-2038',
    customer: 'Naina Gupta',
    garment: 'Blazer',
    due: '18 Aug',
    stage: OrderStage.inProgress,
    progress: 45,
  ),
  Order(
    id: '#SO-2037',
    customer: 'Rohan Mehta',
    garment: 'Shirt & Trousers',
    due: '08 Aug',
    stage: OrderStage.delivered,
    progress: 100,
  ),
];
