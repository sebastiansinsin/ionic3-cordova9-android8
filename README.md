# how to serve
`ionic serve -- -c=TARGET_ENV`
###### List of TARGET_ENV
```
development
staging
```

# how to build
`ionic build -- -c=TARGET_ENV`
###### List of TARGET_ENV
```
production
build-staging
build-development
```
--> to ios:
1. ionic cordova platform add ios
2. ionic cordova build ios
3. open /platform/ios/paper beta.xcworkspace with xcode
4. cmd + b to test build
5. on menubar --> project --> archive, if archive is not available make sure you change target build to generic (not to simulator)
6. select distribute app
7. select app store connect
8. select upload
9. leave the checkbox checked "upload app's symbol to receive..."
10. select automatically manage signin
11. select upload
12. login to appstoreconnect.apple.com
13. select your app
14. make sure, your latest build is processed
15. wait until it is allowed to invite testers by the appstore team, than you can invite internal testers

if these plugins are installed when running ionic cordova build ios:
1. userexperior-cordova-plugin --> will cause to fail during simulator test
2. cordova-plugin-facebook4 --> will cause to fail during build (cmd + b)
it is likely that the build is going to fail

make sure these plugins are not installed when running ionic cordova build ios, or alternatively you can:
1. go to build phases in xcode
2. under "compile sources" section, find the mentioned plugins and delete them by selecting the plugins and clickin the minus sign (-) located at the bottom of the section

if unable to run app from xcode to iphone "A valid provisioning profile for this executable was not found.", from xcode menubar go to files --> workspace setting / project setting --> change build system to legacy build system

if error "Showing Recent Messages Paper Beta has conflicting provisioning settings. Paper Beta is automatically signed for development, but a conflicting code signing identity iPhone Distribution has been manually specified. Set the code signing identity value to "iPhone Developer" in the build settings editor, or switch to manual signing in the Signing & Capabilities editor." when trying to archive, try to uncheck and check "automatically manage signing" checkbox in "Signing & Capabilities" tab

if error "ERROR ITMS-90189: "Redundant Binary Upload. You've already uploaded a build with build number '1.2.457' for version number '1.2.457'. Make sure you increment the build string before you upload your app to App Store Connect. Learn more in Xcode Help (http://help.apple.com/xcode/mac/current/#/devba7f53ad4)."", in project target "general" tab, change the build version string

if error "ERROR ITMS-90174: "Missing Provisioning Profile - Apps must contain a provisioning profile in a file named embedded.mobileprovision."", from xcode menubar go to files --> workspace setting / project setting --> change build system to legacy build system

if error "ERROR ITMS-90087: "Unsupported Architecture. Your executable contains unsupported architecture '[x86_64, i386]'."", https://stackoverflow.com/questions/30547283/submit-to-app-store-issues-unsupported-architecture-x86