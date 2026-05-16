const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the old logo source paths with the new logo
  const logoRegex = /src="\.\/[^"]+REF-LOGO-PRIMARY-SOFT-WHITE\.svg"/g;
  content = content.replace(logoRegex, 'src="Smiith&Realities_white.png"');

  fs.writeFileSync(file, content);
  console.log('Updated logo in ' + file);
});
