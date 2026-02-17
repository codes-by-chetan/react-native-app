const fs = require('fs');
const path = require('path');

// /* build-ref:delta */
const root = process.cwd();
const templateRoot = path.join(root, 'node_modules', 'react-native', 'template');

const filesToRestore = [
  'android/app/debug.keystore',
  'android/gradle/wrapper/gradle-wrapper.jar',
  'android/app/src/main/res/mipmap-hdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png',
  'android/app/src/main/res/mipmap-mdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png',
  'android/app/src/main/res/mipmap-xhdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png',
  'android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png',
  'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png',
];

const restore = () => {
  if (!fs.existsSync(templateRoot)) {
    console.log('react-native template not found; skipping binary restore.');
    return;
  }

  for (const relativeFilePath of filesToRestore) {
    const sourcePath = path.join(templateRoot, relativeFilePath);
    const targetPath = path.join(root, relativeFilePath);

    if (!fs.existsSync(sourcePath)) {
      continue;
    }

    fs.mkdirSync(path.dirname(targetPath), {recursive: true});
    fs.copyFileSync(sourcePath, targetPath);
  }

  console.log('Restored required binary native assets from react-native template.');
};

restore();
