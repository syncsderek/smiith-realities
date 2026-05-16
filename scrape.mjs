import scrape from 'website-scraper';
import PuppeteerPlugin from 'website-scraper-puppeteer';

const url = 'https://tref.digitaldesignnyc.co/';

scrape({
  urls: [url],
  directory: './tref_clone',
  plugins: [
    new PuppeteerPlugin({
      launchOptions: { headless: true },
      scrollToBottom: { timeout: 10000, viewportN: 10 },
    })
  ],
  recursive: true,
  maxDepth: 2,
  ignoreErrors: true,
  urlFilter: function(u) {
    return u.indexOf(url) === 0;
  }
}).then((result) => {
  console.log("Successfully downloaded website!");
}).catch((err) => {
  console.error("Error downloading website:", err);
});
