# StitchBook2 — StitchBook Enterprise v2

Tailoring & garment order management studio.

## Two builds live in this repo

1. **Web app (Material UI v9)** — Vite + React 19 + MUI v9.3.
   ```bash
   npm install && npm run dev
   ```

2. **Flutter app (Material 3)** — complete, self-contained source in
   [`stitchbook_enterprise/`](stitchbook_enterprise/). Builds an installable
   Android APK on any machine with Flutter — see
   [`stitchbook_enterprise/README.md`](stitchbook_enterprise/README.md).

> Note: the sandbox that prepared this repo only has network access to
> github.com, so the Flutter/Android toolchains (which are fetched from
> storage.googleapis.com / pub.dev / dl.google.com) could not be downloaded
> here and no `.apk` binary could be produced. The Flutter source is complete
> and ready to build with `flutter create . && flutter build apk --release`.
