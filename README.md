This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start mySideMenu sidemenu
```

Then, to run it, cd into `mySideMenu` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.



How to Run / Serve
---

lakukan cloning dari bitbucket
delete package-lock.json
npm install
jika node version lebih dari 6 = npm rebuild node-sass --force

untuk run di web melalui command prompt
set MY_ENV=NAMA_ENV_TARGET&&ionic serve ATAU
set my_env=NAMA_ENV_TARGET&&ionic serve

*** list NAMA_ENV_TARGET**
staging-beta -> digunakan untuk build apk dengan target staging server cmd ionic build --prod
dev-beta -> digunakan untuk build apk dengan target dev server dengan cmd ionic build --prod
staging -> digunakan untuk ionic serve dengan target staging server
dev -> digunakan untuk ionic serve dengan target dev server
prod-dev -> digunakan untuk ionic serve dengan target prod server

*** Jika error Typescript Error Cannot find name 'unknown'. paper_ionic/node_modules/raven-js/typescript/raven.d.ts ***
1. tambahkan  Error | ErrorEvent | string pada captureException line 205

***Jika ada error Cannot find module ...\ionic-app-scripts.js' ***
1. hapus `"@ionic/app-scripts"` dari package.json
2. jalankan `npm install @ionic/app-scripts@latest --save-dev` di terminal

***Jika ada error  TypeError: Cannot set property 'alias' of undefined ***

ganti isi file `webpack.config.js` menjadi script dibawah ini

```
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

module.exports = function () {
  var env = process.env.IONIC_ENV === 'prod' ? '' : '.dev'
  var pathUrl = './src/environments/environment' + env + '.ts'
  var alias = { "@app/env": path.resolve(pathUrl) };
  useDefaultConfig.dev.resolve.alias = alias;
  useDefaultConfig.prod.resolve.alias = alias;
  return useDefaultConfig;
};
```

How to Build
---

pastikan sudah terinstall android sdk manager. kalu belum ikuti langkah langkah ini:
[Link Tutorial](https://www.codepolitan.com/membuat-aplikasi-android-berbasis-html5-cordova)


1. Install Cordova
```bash
$ npm install -g cordova
```

2. Install Java Development Kit (JDK)
cek versi java

```bash
javac -version
```

download jdk di  [oracle](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

Setelah proses instalasi  selesai, update path dengan lokasi instalasi JDK agar JDK dapat dikenali di command line. Buka Control Panel, pilih System and Security, pilih System, pilih Advanced System Settings, akan muncul jendela System Properties. Pada tab Advanced klik tombol Environment Variables..

Pada jendela Environment Variables bagian list user variables, pilih variable PATH lalu klik tombol Edit. Pada bagian akhir Variable value, tambahkan path folder tempat JDK disimpan, dalam kasus di komputer saya pathnya adalah ;C:\Program Files\Java\jdk1.8.0_20\bin. Kita pisahkan path value sebelumnya dengan path baru JDK kita dengan titik koma. Klik tombol OK pada jendela Edit.
Selanjutnya buat variable dengan mengklik tombol New.., pada bagian Variable name isi dengan JAVA_HOME (kalo variabel ini sudah ada, maka pilih dan klik tombol Edit), lalu pada bagian Variable value isi path folder JDK seperti langkah sebelumnya dengan tanpa diakhiri folder \bin. Dalam kasus di komputer saya adalah ;C:\Program Files\Java\jdk1.8.0_20. Klik tombol OK.
Klik tombol OK lagi untuk menutup jendela Environment Variable.

Sekarang tes hasil instalasi. Buka jendela terminal atau cmd baru lalu ketik perintah ```bash javac -version ``` Kalo muncul nomor versi, itu tandanya JDK sudah siap digunakan.

Install Ant
download ant di [sini](http://ant.apache.org/bindownload.cgi)
setelah install selesai, daftarkan lagi di environment.

install gradle
download gradle di [sini](https://gradle.org/install/)
setelah install selesai, daftarkan lagi di environment.

Install Android SDK Tools
download android sdk tools di [sini](https://dl.google.com/android/installer_r24.4.1-windows.exe?utm_source=androiddevtools&utm_medium=website)

Daftarkan path Android SDK pada variable PATH seperti pada step sebelumnya. Buka Control Panel, pilih System and Security, pilih System, pilih Advanced System Settings, akan muncul jendela System Properties. Pada tab Advanced klik tombol Environment Variables..
Pada jendela Environment Variables bagian list user variables, pilih variable PATH lalu klik tombol Edit. Pada bagian akhir Variable value, tambahkan path folder tools dan platform-tools Android SDK, dalam kasus di komputer saya path toolsnya adalah dan path platform-toolsnya adalah ;C:\Program Files (x86)\Android\android-sdk\platform-tools. Kita pisahkan antar path value dengan titik koma. Klik tombol OK pada jendela Edit.
Klik tombol OK lagi untuk menutup jendela Environment Variable.
Tes hasil instalasi dengan memanggil perintah pada jendela baru cmd: adb version Perintah ini akan menampilkan nomor versi Android Debug Bridge.
Langkah terakhir adalah menginstall versi SDK yang dibutuhkan oleh Cordova. Panggil perintah android pada command line untuk memunculkan jendela Android SDK Manager. Akan muncul daftar ceklis apa saja yang harus diinstal dan diupdate dari Android SDK. Saat pertama kali menjalankan Android SDK Manager ini, akan ada beberapa bagian yang secara default terceklis. Biarkan seperti itu lalu klik tombol Install n Packages.. Aplikasi akan mengunduh dan menginstal sejumlah SDK yang wajib diinstal. Saat tulisan ini dibuat versi Cordova terakhir adalah versi 6.1 dan dia memerlukan SDK Android 6.0. Kedepannya seiring perkembangan Cordova mungkin versi SDK yang diperlukan oleh Cordova juga akan meningkat. So Kamu tinggal menyesuaikan kebutuhan dengan menginstal SDK yang diperlukan seperti pada langkah di atas.


ionic cordova platform add android
ionic cordova plugin add cordova-plugin-file-transfer@~1.5.1
ionic cordova plugin add manual-plugins\com.kochava.sdk --nofetch
ionic cordova plugin add manual-plugins\cordova-plugin-firebase-analytics --nofetch (full path)
ionic cordova build android (if success done)

jika error berkaitan dengan resources ketika build :

jalankan  "ionic cordova resources"

Jika error lagi coba check pada platforms/android/project.propertis apakah sudah sesuai

target=android-28
android.library.reference.1=CordovaLib
cordova.gradle.include.1=com-sarriaroman-photoviewer/beta-photoviewer.gradle
cordova.system.library.1=com.android.support:appcompat-v7:23+
cordova.gradle.include.2=com.synconset.imagepicker/beta-ignorelinterrors.gradle
cordova.gradle.include.3=com.synconset.imagepicker/beta-androidtarget.gradle
cordova.gradle.include.4=cordova-android-support-gradle-release/beta-cordova-android-support-gradle-release.gradle
cordova.system.library.2=com.appsee:appsee-android:2.4.5
cordova.system.library.3=com.android.support:support-v4:+
cordova.system.library.4=com.google.firebase:firebase-core:11.0.4
cordova.gradle.include.5=cordova-support-google-services/beta-build.gradle
cordova.system.library.5=com.google.android.gms:play-services-tagmanager:11.0.4
cordova.system.library.6=com.android.support:support-v4:24.1.1+
# cordova.system.library.7=com.google.android.gms:play-services-analytics:$GMS_VERSION
cordova.system.library.8=com.android.support:support-v4:26.+
cordova.system.library.9=com.android.support:appcompat-v7:26.+
cordova.system.library.10=com.facebook.android:facebook-android-sdk:[4,5)
cordova.gradle.include.6=userexperior-cordova-plugin/beta-userexperior-plugin.gradle
cordova.system.library.7=com.android.support:support-v4:24.1.1+

# android.library.reference.2=app

jika sudah di publish dan ssl error, rubah di
project/platforms/android/CordovaLib/src/org/apache/cordova/engine/SystemWebViewClient.java

jadi seperti ini
```bash
ApplicationInfo appInfo;
try {
    appInfo = pm.getApplicationInfo(packageName, PackageManager.GET_META_DATA);
    if ((appInfo.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
        // debug = true
        handler.proceed();
        return;
    } else {
        // debug = false
        handler.proceed();
        //super.onReceivedSslError(view, handler, error);
    }
} catch (NameNotFoundException e) {
    // When it doubt, lock it out!
    handler.proceed();
    //super.onReceivedSslError(view, handler, error);
}
```


check list before publish.
1. pastikan ubah version dan versionCode di config.xml ke terbaru (tambah 1)
2. pastikan environment benar, tambah android:allowBackup="false" android:fullBackupContent="false" android:usesCleartextTraffic="true" di androidManifest.xml
3. build apk ```bash ionic cordova build android --prod --release```
4. tambahkan sign ke apk ```bash jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore paper-ionic.jks .\platforms\android\build\outputs\apk\android-release-unsigned.apk paper ```
5. pindahkan file apk yg sudah di tantatangani ke folder path androidSDK\build-tool\API-level\
6. untul publish ke google play kita harus mengoptimalkan apk dengan zarsigner. jalankan perintah ini di CMD ```bash zipalign -v 4 android-release-unsigned.apk paper-V1-code.apk ```
7. Masuk ke https://play.google.com/apps/publish lalu pilih aplikasi nya
8. pilih Release Management -> App Release
9. pilih manage di Production / Beta
10. create relese, pilih file apk dan isi release note nya
11. Pastikan versi_mobile di applicationStatus sama dengan versi android ketika publish

jika build terjadi error : FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
build dengan syntax : ionic cordova build android --aot --uglifyjs --minifyjs --minifycss --release

## remove unused code if you want
first install required tools
```bash
npm install -g typescript tslint tslint-etc
```
Create a new file named ``tslint-imports.json`` in the root of your project
This file needs following contents :
```bash
{
    "extends": [
        "tslint-etc"
    ],
    "rules": {
        "no-unused-declaration": {
            "options": [
                {
                    "declarations": true,
                    "ignored": {},
                    "imports": true
                }
            ],
            "severity": "error"
        }
    }
}
```

```bash
tslint --config tslint-imports.json --fix --project .
```
## BE CAREFUL USING THIS ALWAYS REMEMBER TO DOUBLE CHECK ALL THE CHANGES