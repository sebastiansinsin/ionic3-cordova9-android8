## Cordova 9 & Cordova Android 8 Setup android
first you need to run ```bash npm install``` and then ```bash cordova platform add android```

then you need to do this step to able run or build android :
change version com.google.firebase:firebase-messaging from 17.3.4 to 20.1.2 on /platform/android/project.properties
add classpath 'com.google.gms:google-services:4.3.3' in dependencies Object on /platform/android/build.gradle
copy file google-services.json into /platforms/android/app

## missing google-service.json for firebase analytics, please add yours.