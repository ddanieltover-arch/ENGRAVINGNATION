const { google } = require('googleapis');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const HOST = 'engravingnation.store';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const KEY_FILE = path.join(process.cwd(), 'service-account.json');

async function runIndexing() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error('❌ Error: service-account.json not found in the root directory.');
    console.log('To set this up:');
    console.log('1. Go to Google Cloud Console.');
    console.log('2. Enable "Indexing API".');
    console.log('3. Create a Service Account and download the JSON key as "service-account.json".');
    console.log('4. Add the service account email (found in the JSON) to Google Search Console as an Owner.');
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const client = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: client });

    console.log('Fetching sitemap to extract URLs...');
    const response = await axios.get(SITEMAP_URL);
    const sitemapContent = response.data;
    
    const urlRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
    const urls = [];
    let match;
    while ((match = urlRegex.exec(sitemapContent)) !== null) {
      urls.push(match[1]);
    }

    if (urls.length === 0) {
      console.error('No URLs found in sitemap.');
      return;
    }

    console.log(`Found ${urls.length} URLs. Notifying Google Indexing API...`);

    for (const url of urls) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`✅ Notified Google: ${url}`);
      } catch (err) {
        console.error(`❌ Failed to notify Google for ${url}:`, err.message);
      }
    }

    console.log('✅ Google Indexing API process complete!');

  } catch (error) {
    console.error('❌ Error in Google Indexing script:', error.message);
  }
}

runIndexing();
