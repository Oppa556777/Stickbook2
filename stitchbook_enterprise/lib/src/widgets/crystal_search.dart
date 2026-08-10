import 'package:flutter/material.dart';
import '../theme.dart';

/// Advanced search bar with a glowing, animated crystal frame and floating
/// crystal sparkles. Replaces the former quick-edit "pencil" control and is
/// purely search based — no AI search.
class CrystalSearchBar extends StatefulWidget {
  const CrystalSearchBar({super.key});

  @override
  State<CrystalSearchBar> createState() => _CrystalSearchBarState();
}

class _CrystalSearchBarState extends State<CrystalSearchBar>
    with SingleTickerProviderStateMixin {
  late final AnimationController _frame = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 6),
  )..repeat();

  final _controller = TextEditingController();
  final Set<String> _activeFilters = {'In progress', 'Priority'};

  static const _allFilters = [
    'In progress',
    'Ready',
    'Delivered',
    'Priority',
    'Paid',
    'Due soon',
  ];

  @override
  void dispose() {
    _frame.dispose();
    _controller.dispose();
    super.dispose();
  }

  void _toggleFilter(String f) {
    setState(() {
      _activeFilters.contains(f) ? _activeFilters.remove(f) : _activeFilters.add(f);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Animated flowing crystal frame that wraps the search field.
        AnimatedBuilder(
          animation: _frame,
          builder: (context, _) {
            final t = _frame.value;
            return Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(24),
                gradient: SweepGradient(
                  transform: GradientRotation(t * 6.2832),
                  colors: const [
                    Color(0xFF7C6CFF),
                    Color(0xFF52D6F2),
                    Color(0xFFA78BFA),
                    Color(0xFF7C6CFF),
                  ],
                ),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF7C6CFF).withOpacity(0.5),
                    blurRadius: 22,
                    spreadRadius: 1,
                  ),
                  BoxShadow(
                    color: const Color(0xFF52D6F2).withOpacity(0.28),
                    blurRadius: 60,
                  ),
                ],
              ),
              // Inner dark field.
              child: Container(
                margin: const EdgeInsets.all(2),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(22),
                  color: const Color(0xFF100E1E).withOpacity(0.94),
                ),
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                child: Row(
                  children: [
                    const Icon(Icons.search_rounded, color: Color(0xFF7C6CFF)),
                    const SizedBox(width: 12),
                    Expanded(
                      child: TextField(
                        controller: _controller,
                        onChanged: (_) => setState(() {}),
                        style: const TextStyle(
                          color: textPrimary,
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                        decoration: const InputDecoration(
                          filled: false,
                          isDense: true,
                          hintText: 'Search orders, customers, garments…',
                          hintStyle: TextStyle(color: textMuted),
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                    if (_controller.text.isNotEmpty)
                      IconButton(
                        icon: const Icon(Icons.close_rounded,
                            size: 18, color: textMuted),
                        onPressed: () => setState(_controller.clear),
                      ),
                    const SizedBox(width: 4),
                    FilledButton.icon(
                      onPressed: () => _showFilters(context),
                      style: FilledButton.styleFrom(
                        backgroundColor: const Color(0xFF7C6CFF),
                        foregroundColor: const Color(0xFF0B0A14),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 18, vertical: 12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(999)),
                      ),
                      icon: const Icon(Icons.filter_alt_rounded, size: 18),
                      label: const Text('Advanced'),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
        if (_activeFilters.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 10),
            child: Wrap(
              spacing: 8,
              runSpacing: 4,
              alignment: WrapAlignment.center,
              children: [
                for (final f in _activeFilters)
                  Chip(
                    label: Text(f),
                    onDeleted: () => _toggleFilter(f),
                    backgroundColor:
                        const Color(0xFF7C6CFF).withOpacity(0.14),
                    side: const BorderSide(color: Color(0x4D7C6CFF)),
                    labelStyle: const TextStyle(color: Color(0xFFB7AFFF)),
                    deleteIconColor: const Color(0xFFB7AFFF),
                  ),
              ],
            ),
          ),
      ],
    );
  }

  void _showFilters(BuildContext context) {
    showModalBottomSheet<void>(
      context: context,
      backgroundColor: bgSurfaceAlt,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (sheetCtx) {
        return StatefulBuilder(
          builder: (context, setSheet) => Padding(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 28),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Advanced filters',
                    style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
                const SizedBox(height: 6),
                const Text('Refine results across your workshop.',
                    style: TextStyle(color: textSecondary, fontSize: 13)),
                const SizedBox(height: 16),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    for (final f in _allFilters)
                      FilterChip(
                        label: Text(f),
                        selected: _activeFilters.contains(f),
                        onSelected: (_) => _toggleFilter(f),
                        selectedColor: const Color(0xFF7C6CFF),
                        checkmarkColor: const Color(0xFF0B0A14),
                        labelStyle: TextStyle(
                          color: _activeFilters.contains(f)
                              ? const Color(0xFF0B0A14)
                              : textPrimary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
