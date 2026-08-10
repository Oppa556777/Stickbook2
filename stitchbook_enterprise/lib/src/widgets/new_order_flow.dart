import 'dart:math' as math;

import 'package:flutter/material.dart';
import '../theme.dart';

/// Multi-step "New Order" creation flow. Launched from the centred app-bar
/// button (the homepage itself has no New Order button).
class NewOrderFlow extends StatefulWidget {
  const NewOrderFlow({super.key});

  @override
  State<NewOrderFlow> createState() => _NewOrderFlowState();
}

class _NewOrderFlowState extends State<NewOrderFlow> {
  int _step = 0;
  static const _steps = ['Customer', 'Garment & Fit', 'Measurements', 'Review'];

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: const Color(0xFF151229),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      title: ShaderMask(
        shaderCallback: (bounds) => crystalGradient.createShader(bounds),
        child: const Text('New Order',
            style: TextStyle(fontWeight: FontWeight.w800, fontSize: 22)),
      ),
      content: SizedBox(
        width: math.min(440.0, MediaQuery.sizeOf(context).width * 0.92),
        height: 340,
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Stepper
              Row(
                children: List.generate(_steps.length, (i) {
                  final isActive = i <= _step;
                  return Expanded(
                    child: Column(
                      children: [
                        Container(
                          width: 26,
                          height: 26,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: isActive
                                ? const Color(0xFF7C6CFF)
                                : const Color(0xFF2A2740),
                          ),
                          child: Text('${i + 1}',
                              style: TextStyle(
                                  color: isActive
                                      ? const Color(0xFF0B0A14)
                                      : textMuted,
                                  fontWeight: FontWeight.w800,
                                  fontSize: 12)),
                        ),
                        const SizedBox(height: 4),
                        Text(_steps[i],
                            style: TextStyle(
                                fontSize: 10,
                                color: isActive ? textPrimary : textMuted,
                                fontWeight:
                                    isActive ? FontWeight.w700 : FontWeight.w400)),
                      ],
                    ),
                  );
                }),
              ),
              const SizedBox(height: 20),
              Flexible(child: SingleChildScrollView(child: _buildStep())),
            ],
          ),
        ),
      ),
      actionsPadding: const EdgeInsets.fromLTRB(24, 0, 24, 20),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        const Spacer(),
        if (_step > 0)
          TextButton(
            onPressed: () => setState(() => _step--),
            child: const Text('Back'),
          ),
        const SizedBox(width: 8),
        FilledButton(
          style: FilledButton.styleFrom(
            backgroundColor: const Color(0xFF7C6CFF),
            foregroundColor: const Color(0xFF0B0A14),
          ),
          onPressed: () {
            if (_step < _steps.length - 1) {
              setState(() => _step++);
            } else {
              Navigator.of(context).pop();
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                    content: Text('Order created — added to your workshop.')),
              );
            }
          },
          child: Text(_step == _steps.length - 1 ? 'Create order' : 'Next'),
        ),
      ],
    );
  }

  Widget _buildStep() {
    switch (_step) {
      case 0:
        return const Column(
          children: [
            TextFormField(decoration: InputDecoration(labelText: 'Customer name')),
            SizedBox(height: 14),
            TextFormField(
                decoration: InputDecoration(labelText: 'Phone number'),
                keyboardType: TextInputType.phone),
            SizedBox(height: 14),
            TextFormField(
                decoration: InputDecoration(labelText: 'Notes'),
                maxLines: 3),
          ],
        );
      case 1:
        return const Column(
          children: [
            DropdownButtonFormField<String>(
              decoration: InputDecoration(labelText: 'Garment type'),
              value: 'Formal Suit',
              items: [
                DropdownMenuItem(value: 'Formal Suit', child: Text('Formal Suit')),
                DropdownMenuItem(value: 'Sherwani', child: Text('Sherwani')),
                DropdownMenuItem(value: 'Kurta Set', child: Text('Kurta Set')),
                DropdownMenuItem(value: 'Shirt & Trousers', child: Text('Shirt & Trousers')),
                DropdownMenuItem(value: 'Blazer', child: Text('Blazer')),
                DropdownMenuItem(value: 'Waistcoat', child: Text('Waistcoat')),
              ],
              onChanged: null,
            ),
            SizedBox(height: 14),
            DropdownButtonFormField<String>(
              decoration: InputDecoration(labelText: 'Fit'),
              value: 'Regular',
              items: [
                DropdownMenuItem(value: 'Slim', child: Text('Slim')),
                DropdownMenuItem(value: 'Regular', child: Text('Regular')),
                DropdownMenuItem(value: 'Comfort', child: Text('Comfort')),
              ],
              onChanged: null,
            ),
            SizedBox(height: 14),
            TextFormField(
                decoration: InputDecoration(labelText: 'Due date'),
                readOnly: true),
          ],
        );
      case 2:
        return const Column(
          children: [
            TextFormField(decoration: InputDecoration(labelText: 'Chest (in)')),
            SizedBox(height: 14),
            TextFormField(decoration: InputDecoration(labelText: 'Waist (in)')),
            SizedBox(height: 14),
            TextFormField(decoration: InputDecoration(labelText: 'Sleeve (in)')),
            SizedBox(height: 14),
            TextFormField(decoration: InputDecoration(labelText: 'Length (in)')),
          ],
        );
      default:
        return const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _ReviewRow(label: 'Customer', value: '—'),
            Divider(height: 18, color: dividerColor),
            _ReviewRow(label: 'Garment', value: '—'),
            Divider(height: 18, color: dividerColor),
            _ReviewRow(label: 'Priority', value: 'Standard'),
            Divider(height: 18, color: dividerColor),
            _ReviewRow(label: 'Status', value: 'In progress'),
          ],
        );
    }
  }
}

class _ReviewRow extends StatelessWidget {
  const _ReviewRow({required this.label, required this.value});
  final String label;
  final String value;
  @override
  Widget build(BuildContext context) => Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: textMuted)),
          Text(value,
              style: const TextStyle(
                  color: textPrimary, fontWeight: FontWeight.w700)),
        ],
      );
}
