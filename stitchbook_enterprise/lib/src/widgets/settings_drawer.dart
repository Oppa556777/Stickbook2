import 'package:flutter/material.dart';
import '../theme.dart';

enum SettingsGroup { shop, workflow, notifications, appearance, data, security }

class _GroupInfo {
  const _GroupInfo(this.title, this.subtitle, this.icon);
  final String title;
  final String subtitle;
  final IconData icon;
}

const _groups = <SettingsGroup, _GroupInfo>{
  SettingsGroup.shop: _GroupInfo('Shop Profile', 'Business & currency', Icons.storefront_rounded),
  SettingsGroup.workflow: _GroupInfo('Workflow', 'Order flow & stages', Icons.tune_rounded),
  SettingsGroup.notifications: _GroupInfo('Notifications', 'Alerts & reminders', Icons.notifications_rounded),
  SettingsGroup.appearance: _GroupInfo('Appearance', 'Theme & accent', Icons.color_lens_rounded),
  SettingsGroup.data: _GroupInfo('Data & Backup', 'Cloud sync & export', Icons.cloud_rounded),
  SettingsGroup.security: _GroupInfo('Security', 'Roles & privacy', Icons.security_rounded),
};

/// Organised, grouped settings drawer — the wide Settings pill in the app bar
/// opens this instead of a bare popover.
class SettingsDrawer extends StatefulWidget {
  const SettingsDrawer({super.key});

  @override
  State<SettingsDrawer> createState() => _SettingsDrawerState();
}

class _SettingsDrawerState extends State<SettingsDrawer> {
  SettingsGroup _active = SettingsGroup.shop;
  bool _orderAlerts = true;
  bool _deliveryReminders = true;
  bool _weeklyReport = false;
  bool _cloudSync = true;
  bool _autoBackup = true;
  bool _compact = false;
  double _radius = 16;

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: bgSurface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
      width: 380,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.fromLTRB(20, 24, 20, 20),
            decoration: const BoxDecoration(gradient: crystalGradient),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Settings',
                    style: TextStyle(
                        color: Color(0xFF0B0A14),
                        fontWeight: FontWeight.w800,
                        fontSize: 22)),
                SizedBox(height: 2),
                Text('StitchBook Enterprise v2 — organised controls',
                    style: TextStyle(color: Color(0x9E0B0A14), fontSize: 12)),
              ],
            ),
          ),
          Expanded(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Grouped settings list
                SizedBox(
                  width: 172,
                  child: ListView.builder(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    itemCount: _groups.length,
                    itemBuilder: (context, i) {
                      final group = _groups.keys.elementAt(i);
                      final info = _groups[group]!;
                      final selected = _active == group;
                      return Padding(
                        padding:
                            const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        child: Material(
                          color: selected
                              ? const Color(0xFF7C6CFF).withOpacity(0.16)
                              : Colors.transparent,
                          borderRadius: BorderRadius.circular(12),
                          child: InkWell(
                            borderRadius: BorderRadius.circular(12),
                            onTap: () => setState(() => _active = group),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 10, vertical: 10),
                              child: Row(
                                children: [
                                  Icon(
                                    info.icon,
                                    size: 20,
                                    color: selected
                                        ? const Color(0xFFA78BFA)
                                        : textSecondary,
                                  ),
                                  const SizedBox(width: 10),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(info.title,
                                            style: const TextStyle(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 13)),
                                        Text(info.subtitle,
                                            style: const TextStyle(
                                                color: textMuted, fontSize: 10)),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                // Active panel
                Expanded(
                  child: Container(
                    color: const Color(0xFF100E1E).withOpacity(0.5),
                    padding: const EdgeInsets.all(16),
                    child: _buildPanel(_active),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPanel(SettingsGroup group) {
    switch (group) {
      case SettingsGroup.shop:
        return ListView(
          children: const [
            _SectionTitle('Shop Profile'),
            _FieldRow(icon: Icons.shopping_bag_rounded, label: 'Business name', value: 'StitchBook Studio'),
            _FieldRow(icon: Icons.people_rounded, label: 'Tailors on staff', value: '8'),
            _FieldRow(icon: Icons.style_rounded, label: 'Default garment', value: 'Formal Suit'),
            _FieldRow(icon: Icons.receipt_rounded, label: 'Tax rate (%)', value: '12'),
          ],
        );
      case SettingsGroup.workflow:
        return ListView(
          children: [
            const _SectionTitle('Workflow'),
            _ToggleRow(
              label: 'Order alerts',
              sub: 'Toast when a new order arrives',
              value: _orderAlerts,
              onChanged: (v) => setState(() => _orderAlerts = v),
            ),
            _ToggleRow(
              label: 'Delivery reminders',
              sub: 'Remind before due dates',
              value: _deliveryReminders,
              onChanged: (v) => setState(() => _deliveryReminders = v),
            ),
            _ToggleRow(
              label: 'Weekly report',
              sub: 'Email a summary every Monday',
              value: _weeklyReport,
              onChanged: (v) => setState(() => _weeklyReport = v),
            ),
          ],
        );
      case SettingsGroup.notifications:
        return ListView(
          children: [
            const _SectionTitle('Notifications'),
            const _ToggleRow(label: 'Push notifications', sub: 'Live updates on your device', value: true, onChanged: null),
            _ToggleRow(
              label: 'Email digest',
              sub: 'Daily summary of activity',
              value: _weeklyReport,
              onChanged: (v) => setState(() => _weeklyReport = v),
            ),
          ],
        );
      case SettingsGroup.appearance:
        return ListView(
          children: [
            const _SectionTitle('Appearance'),
            const Text('Corner radius', style: TextStyle(fontSize: 12, color: textMuted)),
            Slider(
              value: _radius,
              min: 6,
              max: 28,
              onChanged: (v) => setState(() => _radius = v),
              activeColor: const Color(0xFF7C6CFF),
              label: '${_radius.round()}',
            ),
            const SizedBox(height: 8),
            const Text('Accent', style: TextStyle(fontSize: 12, color: textMuted)),
            const SizedBox(height: 8),
            const Wrap(spacing: 8, children: [
              _AccentSwatch(label: 'Crystal', gradient: crystalGradient),
            ]),
            const SizedBox(height: 8),
            _ToggleRow(
              label: 'Compact mode',
              sub: 'Denser cards & spacing',
              value: _compact,
              onChanged: (v) => setState(() => _compact = v),
            ),
          ],
        );
      case SettingsGroup.data:
        return ListView(
          children: [
            const _SectionTitle('Data & Backup'),
            _ToggleRow(
              label: 'Cloud sync',
              sub: 'Sync orders across devices',
              value: _cloudSync,
              onChanged: (v) => setState(() => _cloudSync = v),
            ),
            _ToggleRow(
              label: 'Auto backup',
              sub: 'Nightly snapshot to cloud',
              value: _autoBackup,
              onChanged: (v) => setState(() => _autoBackup = v),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                OutlinedButton(onPressed: () {}, child: const Text('Export')),
                const SizedBox(width: 8),
                OutlinedButton(onPressed: () {}, child: const Text('Restore')),
              ],
            ),
          ],
        );
      case SettingsGroup.security:
        return ListView(
          children: [
            const _SectionTitle('Security'),
            Chip(
              label: const Text('2 staff admins · 6 tailors'),
              side: const BorderSide(color: Color(0x667C6CFF)),
              labelStyle: const TextStyle(color: Color(0xFFB7AFFF)),
            ),
            const SizedBox(height: 12),
            const _ToggleRow(label: 'Require PIN to open', sub: 'Extra layer on this device', value: true, onChanged: null),
          ],
        );
    }
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle(this.title);
  final String title;
  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.only(bottom: 10),
        child: Text(title,
            style: const TextStyle(
                fontWeight: FontWeight.w800, fontSize: 15, color: textPrimary)),
      );
}

class _FieldRow extends StatelessWidget {
  const _FieldRow(
      {required this.icon, required this.label, required this.value});
  final IconData icon;
  final String label;
  final String value;
  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Row(
          children: [
            Icon(icon, size: 20, color: const Color(0xFF7C6CFF)),
            const SizedBox(width: 12),
            Expanded(
              child: Text(label, style: const TextStyle(color: Color(0xFFC9CFF2))),
            ),
            Text(value,
                style: const TextStyle(
                    fontWeight: FontWeight.w700, color: textPrimary)),
          ],
        ),
      );
}

class _ToggleRow extends StatelessWidget {
  const _ToggleRow(
      {required this.label,
      required this.sub,
      required this.value,
      required this.onChanged});
  final String label;
  final String sub;
  final bool value;
  final ValueChanged<bool>? onChanged;
  @override
  Widget build(BuildContext context) => SwitchListTile(
        value: value,
        onChanged: onChanged,
        activeTrackColor: const Color(0xFF7C6CFF),
        contentPadding: EdgeInsets.zero,
        title: Text(label,
            style:
                const TextStyle(fontWeight: FontWeight.w700, fontSize: 14)),
        subtitle: Text(sub, style: const TextStyle(color: textMuted, fontSize: 12)),
      );
}

class _AccentSwatch extends StatelessWidget {
  const _AccentSwatch({required this.label, required this.gradient});
  final String label;
  final Gradient gradient;
  @override
  Widget build(BuildContext context) => InkWell(
        borderRadius: BorderRadius.circular(10),
        onTap: () {},
        child: Container(
          width: 84,
          height: 36,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            gradient: gradient,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Text(label,
              style: const TextStyle(
                  color: Color(0xFF0B0A14),
                  fontWeight: FontWeight.w800,
                  fontSize: 13)),
        ),
      );
}
