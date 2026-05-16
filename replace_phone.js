const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/949-416-8733/g, '7058770953');
  content = content.replace(/tel:\+?9494168733/g, 'tel:7058770953');
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
