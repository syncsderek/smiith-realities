import fs from 'fs';
import * as cheerio from 'cheerio';

const fileMap = {
  'Home - The Real Estate Fund.html': 'index.html',
  'About - The Real Estate Fund.html': 'about.html',
  'Contact - The Real Estate Fund.html': 'contact.html',
  'Investments - The Real Estate Fund.html': 'investments.html',
  'Team - The Real Estate Fund.html': 'team.html'
};

const tailwindAndStyles = '<script src="https://cdn.tailwindcss.com"></script><style>@keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } } .smooth-reveal { opacity: 0; animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; } .smooth-reveal:nth-child(1) { animation-delay: 0.1s; } .smooth-reveal:nth-child(2) { animation-delay: 0.2s; } .smooth-reveal:nth-child(3) { animation-delay: 0.3s; } .smooth-reveal:nth-child(4) { animation-delay: 0.4s; } .hover-lift { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1); } .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }</style>';

// First rename files
for (const [oldName, newName] of Object.entries(fileMap)) {
  if (fs.existsSync(oldName)) {
    fs.renameSync(oldName, newName);
    console.log("Renamed " + oldName + " to " + newName);
  }
}

// Process each file
for (const newName of Object.values(fileMap)) {
  if (!fs.existsSync(newName)) continue;
  
  let html = fs.readFileSync(newName, 'utf8');
  const $ = cheerio.load(html);

  // 1. Remove old broken scripts and cloudflare stuff
  $('script').remove();
  
  // 2. Inject Tailwind & Custom Animations
  $('head').append(tailwindAndStyles);

  // 3. Update links
  $('a').each((i, el) => {
    let href = $(el).attr('href');
    if (!href) return;
    
    // Remove absolute domain
    href = href.replace('https://tref.digitaldesignnyc.co', '');
    
    if (href === '/' || href === '/home' || href === 'index.html') {
      $(el).attr('href', 'index.html');
    } else if (href.includes('about')) {
      $(el).attr('href', 'about.html');
    } else if (href.includes('contact')) {
      $(el).attr('href', 'contact.html');
    } else if (href.includes('investments')) {
      $(el).attr('href', 'investments.html');
    } else if (href.includes('team')) {
      $(el).attr('href', 'team.html');
    }
  });

  // 4. Add CSS animation classes to key elements
  $('section, h1, h2, h3, img').addClass('smooth-reveal');
  $('a, button, .card').addClass('hover-lift');

  fs.writeFileSync(newName, $.html());
  console.log("Processed " + newName);
}
