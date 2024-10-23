const fs = require('fs');
const path = require('path');

// fixes issues with deprecated repositories
module.exports = (ctx) => {
    // read CordovaLib/cordova.gradle file
    const cordovaGradleFile = path.join(ctx.opts.projectRoot, 'platforms/android/CordovaLib/cordova.gradle');
    let data = fs.readFileSync(cordovaGradleFile, 'utf8');

    // update dependency version and repository location
    let result = data
        .replace(/import com.g00fy2.versioncompare.Version/g, 'import io.github.g00fy2.versioncompare.Version')
        .replace(/com.g00fy2:versioncompare:[\d|.]*/g, 'io.github.g00fy2:versioncompare:1.4.1');

    // write file changes
    fs.writeFileSync(cordovaGradleFile, result, 'utf8');

    // read CordovaLib/build.gradle file
    const buildGradleFile = path.join(ctx.opts.projectRoot, 'platforms/android/CordovaLib/build.gradle');
    data = fs.readFileSync(buildGradleFile, 'utf8');

    // rm bintray
    result = data
        .replace(/.*com.jfrog.bintray.gradle:gradle-bintray-plugin:\d\.\d\.\d.*/g, '')
        .replace(/.*apply plugin: 'com.jfrog.bintray.*/g, '')
        .replace(/bintray {[\s\S]*}/g, '');

    // write file changes
    fs.writeFileSync(buildGradleFile, result, 'utf8');
};