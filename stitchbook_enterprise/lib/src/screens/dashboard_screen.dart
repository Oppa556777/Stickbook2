import 'package:flutter/material.dart';
import '../data/mock_data.dart';
import '../models/order.dart';
import '../theme.dart';
import '../widgets/crystal_search.dart';
import '../widgets/new_order_flow.dart';
import '../widgets/settings_drawer.dart';

/// Home dashboard. Contains no lock icon, no brand name, no pencil icon and
/// no New Order button — the primary action lives in the app bar centre.
class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      endDrawer: const SettingsDrawer(),
      appBar: AppBar(
        toolbarHeight: 72,
        automaticallyImplyLeading: false,
        leadingWidth: 120,
        // Logo mark only (no lock, no "Royal Tailors" name).
        leading: const Padding(
          padding: EdgeInsets.only(left: 16),
          child: _LogoMark(),
        ),
        // New Order button lives here, centred — not on the homepage.
        title: FilledButton.icon(
          style: FilledButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(999)),
            // crystal fill
            backgroundColor: const Color(0xFF7C6CFF),
            foregroundColor: const Color(0xFF0B0A14),
            elevation: 8,
            shadowColor: const Color(0xFF7C6CFF).withOpacity(0.6),
          ),
          onPressed: () => _openNewOrder(context),
          icon: const Icon(Icons.add_circle_outline_rounded),
          label: const Text('New Order',
              style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none_rounded),
            color: textSecondary,
            onPressed: () {},
          ),
          const SizedBox(width: 4),
          // Wide, organised Settings button.
          OutlinedButton.icon(
            onPressed: () => Scaffold.of(context).openEndDrawer(),
            icon: const Icon(Icons.settings_rounded),
            label: const Text('Settings'),
            style: OutlinedButton.styleFrom(
              foregroundColor: const Color(0xFFC9CFF2),
              side: const BorderSide(color: Color(0x3A7C6CFF)),
              padding:
                  const EdgeInsets.symmetric(horizontal: 22, vertical: 12),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(999)),
            ),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: SingleChildScrollView(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1080),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _HeroSearch(),
                  const SizedBox(height: 32),
                  _StatsGrid(),
                  const SizedBox(height: 28),
                  const _RecentOrders(),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  void _openNewOrder(BuildContext context) {
    showDialog<void>(
      context: context,
      builder: (_) => const NewOrderFlow(),
    );
  }
}

class _LogoMark extends StatelessWidget {
  const _LogoMark();
  @override
  Widget build(BuildContext context) => Container(
        width: 40,
        height: 40,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          gradient: crystalGradient,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFF7C6CFF).withOpacity(0.45),
              blurRadius: 20,
            ),
          ],
        ),
        child: const Text('S',
            style: TextStyle(
                fontWeight: FontWeight.w900,
                fontSize: 20,
                color: Color(0xFF0B0A14))),
      );
}

class _HeroSearch extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          'StitchBook Enterprise',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 30,
            fontWeight: FontWeight.w800,
            letterSpacing: -0.5,
            foreground: Paint()
              ..shader = crystalGradient.createShader(
                  const Rect.fromLTWH(0, 0, 400, 40)),
          ),
        ),
        const SizedBox(height: 6),
        const Text('Manage orders, measurements and your tailoring workflow in one studio.',
            textAlign: TextAlign.center,
            style: TextStyle(color: textSecondary, fontSize: 14)),
        const SizedBox(height: 26),
        // Crystal sparkles floating around the search bar.
        Stack(
          clipBehavior: Clip.none,
          children: [
            const CrystalSearchBar(),
            const Positioned(left: 30, top: -6, child: _ShimmerDot()),
            const Positioned(left: -8, top: 60, child: _ShimmerDot()),
            const Positioned(left: 80, top: -2, child: _ShimmerDot()),
          ],
        ),
      ],
    );
  }
}

class _StatsGrid extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = constraints.maxWidth > 720
            ? 4
            : (constraints.maxWidth > 480 ? 2 : 1);
        final w = constraints.maxWidth / cols - 12;
        return Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            for (final s in stats)
              SizedBox(
                width: w,
                child: _StatCardTile(stat: s),
              ),
          ],
        );
      },
    );
  }
}

class _StatCardTile extends StatelessWidget {
  const _StatCardTile({required this.stat});
  final StatCard stat;
  @override
  Widget build(BuildContext context) {
    final color = stat.tint;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: bgSurface.withOpacity(0.6),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: dividerColor),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 36,
                height: 36,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.16),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(stat.icon, size: 20, color: color),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(stat.label,
                    maxLines: 2,
                    style: const TextStyle(
                        color: textSecondary, fontSize: 12)),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(stat.value,
              style: const TextStyle(
                  fontSize: 24, fontWeight: FontWeight.w800, color: textPrimary)),
          const SizedBox(height: 2),
          Text(stat.delta,
              style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }
}

class _RecentOrders extends StatelessWidget {
  const _RecentOrders();
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: bgSurface.withOpacity(0.6),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: dividerColor),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 18, 20, 10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Recent orders',
                    style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w800,
                        color: textPrimary)),
                Text('View all →',
                    style: TextStyle(
                        color: const Color(0xFF7C6CFF),
                        fontWeight: FontWeight.w600)),
              ],
            ),
          ),
          const Divider(height: 1, color: dividerColor),
          for (final o in orders) _OrderRow(order: o),
        ],
      ),
    );
  }
}

class _OrderRow extends StatelessWidget {
  const _OrderRow({required this.order});
  final Order order;
  @override
  Widget build(BuildContext context) {
    final color = order.stageColor;
    return InkWell(
      onTap: () {},
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
        child: Row(
          children: [
            Container(
              width: 34,
              height: 34,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: const Color(0xFF7C6CFF).withOpacity(0.22),
                borderRadius: BorderRadius.circular(9),
              ),
              child: const Icon(Icons.person_rounded,
                  size: 18, color: Color(0xFFB7AFFF)),
            ),
            const SizedBox(width: 14),
            Expanded(
              flex: 3,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(order.id,
                      style: const TextStyle(
                          color: textPrimary,
                          fontWeight: FontWeight.w800,
                          fontSize: 13)),
                  const SizedBox(height: 2),
                  Text(order.customer,
                      style: const TextStyle(color: textSecondary, fontSize: 12)),
                ],
              ),
            ),
            Expanded(
              flex: 2,
              child: Text(order.garment,
                  style: const TextStyle(color: textSecondary, fontSize: 12)),
            ),
            Expanded(
              flex: 1,
              child: Text(order.due,
                  style: const TextStyle(color: textSecondary, fontSize: 12)),
            ),
            const SizedBox(width: 8),
            Chip(
              label: Text(order.stageLabel),
              side: BorderSide(color: color.withOpacity(0.4)),
              backgroundColor: color.withOpacity(0.14),
              labelStyle: TextStyle(color: color, fontWeight: FontWeight.w700),
              padding: const EdgeInsets.symmetric(horizontal: 4),
              visualDensity: VisualDensity.compact,
            ),
            const SizedBox(width: 12),
            SizedBox(
              width: 90,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(99),
                    child: LinearProgressIndicator(
                      value: order.progress / 100,
                      minHeight: 6,
                      backgroundColor: const Color(0xFF7C6CFF).withOpacity(0.12),
                      valueColor: AlwaysStoppedAnimation(color),
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text('${order.progress}%',
                      style: const TextStyle(color: textMuted, fontSize: 10)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// A small twinkling crystal shard used around the advanced search bar.
class _ShimmerDot extends StatefulWidget {
  const _ShimmerDot();
  @override
  State<_ShimmerDot> createState() => _ShimmerDotState();
}

class _ShimmerDotState extends State<_ShimmerDot>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 3),
  )..repeat();

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        final t = _c.value;
        final opacity = ((t - 0.5).abs() * 2).clamp(0.0, 1.0).toDouble();
        return Opacity(
          opacity: opacity,
          child: Transform.rotate(
            angle: t * 6.2832,
            child: Container(
              width: 13,
              height: 13,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(3),
                gradient: crystalGradient,
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF7C6CFF).withOpacity(0.9),
                    blurRadius: 8,
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
