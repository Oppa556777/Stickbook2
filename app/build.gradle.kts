plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.stickbook.aurora"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.stickbook.aurora"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }
}
