const fs = require('fs');
const path = require('path');

// /* build-ref:delta */
const gradleDir = path.join(process.cwd(), 'android', '.gradle');

try {
  if (fs.existsSync(gradleDir)) {
    fs.rmSync(gradleDir, {recursive: true, force: true});
    console.log('Removed android/.gradle cache directory.');
  } else {
    console.log('No android/.gradle directory found.');
  }
} catch (error) {
  console.error('Failed to reset android/.gradle cache:', error);
  process.exitCode = 1;
}
