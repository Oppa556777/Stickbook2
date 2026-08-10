# StitchBook Enterprise v2 — Flutter

A **Flutter (Material 3)** build of the StitchBook Enterprise v2 tailoring studio
app. This folder contains the complete, ready-to-build Dart source that mirrors
the Material UI v9 web version — same features, same "crystal" design language.

## Why there is no `.apk` in this repository

The sandbox this repo was prepared in has **outbound network restricted to
github.com only**. The Flutter SDK, the Dart SDK and all Flutter packages are
downloaded from `storage.googleapis.com` / `pub.dev`, and the Android SDK / JDK
come from `dl.google.com` — all blocked here. So the actual binary **cannot be
compiled in this environment**.

Everything below makes it trivial to build an installable app on any machine
that has Flutter (Windows / macOS / Linux). It is fully self-contained — it uses
**only SDK-bundled packages** (no external pub.dev dependencies), so
`flutter pub get` resolves offline once the SDK is present.

## What is implemented (all requested changes)

- **Material 3** theming everywhere (panels, dialogs, drawers, animations).
- **No lock icon** in the top-left — only the crystal `S` logo mark.
- **No "Royal Tailors and Drapers"** brand name and **no pencil icon**.
- **Wide, organised Settings** pill in the app bar → opens a grouped settings
  drawer (Shop Profile / Workflow / Notifications / Appearance / Data & Backup /
  Security) with working toggles and sliders.
- **Advanced search bar** in the hero position with a **glowing, animated
  crystal frame** and floating twinkling crystal shards, plus an "Advanced"
  filter sheet.
- **AI search removed permanently** — search is manual, with advanced filters.
- **New Order button moved off the homepage** into the **centred app-bar**
  button, opening a 4-step order flow.

## Project layout

```
lib/
  main.dart                      # app entry (StitchBookApp)
  src/theme.dart                 # Material 3 crystal dark theme
  src/models/order.dart          # Order & StatCard models
  src/data/mock_data.dart        # sample stats & orders
  src/screens/dashboard_screen.dart   # homepage
  src/widgets/crystal_search.dart     # glowing advanced search
  src/widgets/settings_drawer.dart    # grouped settings drawer
  src/widgets/new_order_flow.dart     # 4-step New Order dialog
```

## Build & install (any machine with Flutter)

### 1. Install Flutter
Follow https://docs.flutter.dev/get-started/install for your OS.
On Linux you also need the Android toolchain: install **Android Studio** (or
the Android command-line tools + JDK 17) and accept licenses with
`flutter doctor --android-licenses`.

### 2. Scaffold the platform folders (once)
Run inside this folder — this generates `android/`, `ios/`, `web/`, etc. and the
Gradle wrapper, and sets the application package id:

```bash
cd stitchbook_enterprise
flutter create --org com.stitchbook --project-name stitchbook_enterprise .
flutter pub get
```

### 3. Run it on a device / emulator
```bash
flutter run
```

### 4. Build an installable APK
```bash
flutter build apk --release
```
The installable file is written to:

```
build/app/outputs/flutter-apk/app-release.apk
```

Install it on your Android device with `adb install app-release.apk` or by
opening the file on the device. For a signed release to the Play Store, add your
`key.properties` (see Flutter's [signing docs](https://docs.flutter.dev/deployment/android)).

> **Tip:** `flutter build apk --split-per-abi` produces smaller per-device APKs
> under `build/app/outputs/flutter-apk/`.

## Web preview (optional)
```bash
flutter run -d chrome
# or build static web output
flutter build web
```
