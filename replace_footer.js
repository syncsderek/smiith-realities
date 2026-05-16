const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the visible footer text
  const footerRegex = /Created with ♡ by <a[^>]*>DD\.NYC®<\/a>/g;
  content = content.replace(footerRegex, 'Created by Smiith&Co.');
  
  // Remove the hidden HTML comment
  const commentRegex = /<!-- Powered by DD\.NYC® https:\/\/dd\.nyc\/ -->/g;
  content = content.replace(commentRegex, '');

  fs.writeFileSync(file, content);
  console.log('Updated footer in ' + file);
});
