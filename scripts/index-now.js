const axios = require('axios');
const fs = require('fs');
const path = require('path');

const HOST = 'engravingnation.store';
const KEY = 'c3a4f6d8e9b04c5a9d2e1f0b7c8d9e0f';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function pingIndexNow() {
  try {
    console.log('Fetching sitemap to extract URLs...');
    const response = await axios.get(SITEMAP_URL);
    const sitemapContent = response.data;
    
    // Simple regex to extract <loc> contents
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

    console.log(`Found ${urls.length} URLs. Sending to IndexNow...`);

    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls
    };

    const indexNowResponse = await axios.post('https://api.indexnow.org/indexnow', payload);
    
    if (indexNowResponse.status === 200) {
      console.log('✅ IndexNow ping successful!');
    } else {
      console.error('❌ IndexNow ping failed:', indexNowResponse.status);
    }

    // Also ping Bing directly for sitemap
    console.log('Pinging Bing sitemap endpoint...');
    await axios.get(`https://www.bing.com/ping?sitemap=${SITEMAP_URL}`);
    console.log('✅ Bing sitemap ping successful!');

  } catch (error) {
    console.error('❌ Error in IndexNow script:', error.message);
  }
}

pingIndexNow();
