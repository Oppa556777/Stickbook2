import 'package:flutter/material.dart';
import 'src/screens/dashboard_screen.dart';
import 'src/theme.dart';

void main() {
  runApp(const StitchBookApp());
}

/// StitchBook Enterprise v2 — Flutter (Material 3) build.
class StitchBookApp extends StatelessWidget {
  const StitchBookApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StitchBook Enterprise v2',
      debugShowCheckedModeBanner: false,
      theme: buildTheme(),
      home: const DashboardScreen(),
    );
  }
}
