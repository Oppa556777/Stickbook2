import 'package:flutter/material.dart';

/// Crystal gradient used for primary actions, the search frame and accents.
const crystalGradient = LinearGradient(
  begin: Alignment.topLeft,
  end: Alignment.bottomRight,
  colors: [Color(0xFF7C6CFF), Color(0xFF52D6F2), Color(0xFFA78BFA)],
  stops: [0.0, 0.55, 1.0],
);

const bgSurface = Color(0xFF131120);
const bgSurfaceAlt = Color(0xFF191730);
const bgBase = Color(0xFF0B0A14);
const textPrimary = Color(0xFFEEF0FF);
const textSecondary = Color(0xFF9AA0C0);
const textMuted = Color(0xFF6F7699);
const dividerColor = Color(0x247C6CFF); // rgba(140,130,255,0.14)

/// StitchBook Enterprise v2 — "crystal" dark theme (Material 3).
ThemeData buildTheme() {
  final scheme = ColorScheme.fromSeed(
    seedColor: const Color(0xFF7C6CFF),
    brightness: Brightness.dark,
  ).copyWith(
    primary: const Color(0xFF7C6CFF),
    onPrimary: const Color(0xFF0B0A14),
    secondary: const Color(0xFF52D6F2),
    onSecondary: const Color(0xFF0B0A14),
    surface: bgSurface,
    onSurface: textPrimary,
    error: const Color(0xFFFF6B8A),
    outline: dividerColor,
  );

  final base = ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    scaffoldBackgroundColor: bgBase,
  );

  return base.copyWith(
    textTheme: base.textTheme
        .apply(bodyColor: textPrimary, displayColor: textPrimary)
        .copyWith(
          bodySmall: const TextStyle(color: textSecondary),
          labelMedium: const TextStyle(color: textSecondary),
        ),
    appBarTheme: const AppBarTheme(
      backgroundColor: Color(0xB80B0A14), // translucent for blur effect
      elevation: 0,
      centerTitle: true,
      foregroundColor: textPrimary,
    ),
    chipTheme: base.chipTheme.copyWith(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999)),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: bgSurfaceAlt.withOpacity(0.6),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: Color(0xFF7C6CFF), width: 1.4),
      ),
      labelStyle: const TextStyle(color: textSecondary),
      hintStyle: const TextStyle(color: textMuted),
    ),
    navigationBarTheme: const NavigationBarThemeData(
      backgroundColor: bgSurface,
      indicatorColor: Color(0x337C6CFF),
    ),
  );
}
