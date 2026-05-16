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

walkDir(__dirname, function(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = content.replace(/--h2:\s*max\(32px,\s*96rem\);/g, '--h2: max(40px, 120rem);');
  if (content !== updated) {
    fs.writeFileSync(filePath, updated);
    console.log('Increased --h2 size in ' + filePath);
  }
});
