const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory && f !== 'node_modules' && f !== '.git') {
      walkDir(dirPath, callback);
    } else if (f.endsWith('.css')) {
      callback(path.join(dir, f));
    }
  });
}

walkDir('.', function(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace all negative letter-spacings with normal
  let updated = content.replace(/letter-spacing:\s*-[^;]+;/g, 'letter-spacing: normal;');
  if (content !== updated) {
    fs.writeFileSync(filePath, updated);
    console.log('Fixed letter-spacing in ' + filePath);
  }
});
