const fs = require('fs');
const path = require('path');
const https = require('https');

const productsFilePath = path.join(__dirname, '../data/products.json');
const imagesDir = path.join(__dirname, '../public/images/products');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

const downloadImage = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

const uniqueReviews = [
  "Incredible quality. The engraving depth is perfect and it looks amazing on my truck.",
  "Exceeded my expectations. The finish is durable and the custom text was exactly what I wanted.",
  "Fast shipping and elite craftsmanship. This is the real deal.",
  "Looks factory-plus. Best upgrade for the front end of my car.",
  "The detail is insane. I get compliments everywhere I go.",
  "Worth every penny. Deep, clean lines and a premium feel.",
  "Perfect fitment and the black finish is flawless.",
  "Professional grade engraving. Definitely adds a high-end look.",
  "Customer service was great and the product is stunning.",
  "Highly recommend. You won't find better hand-engraved work for your vehicle."
];

async function processProducts() {
  for (let product of products) {
    // 1. Clean up description
    if (product.description) {
      product.description = product.description.replace(/^Description\n/i, '').replace(/^Description:/i, '').trim();
    }

    // 2. Localize images
    if (product.images && product.images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        const imageUrl = product.images[i];
        if (imageUrl.startsWith('https://i.ebayimg.com')) {
          const extension = imageUrl.split('.').pop() || 'jpg';
          const fileName = `${product.slug}-${i}.${extension}`;
          const localPath = path.join(imagesDir, fileName);
          const publicPath = `/images/products/${fileName}`;

          console.log(`Downloading ${imageUrl} to ${localPath}...`);
          try {
            await downloadImage(imageUrl, localPath);
            product.images[i] = publicPath;
          } catch (err) {
            console.error(`Error downloading ${imageUrl}: ${err.message}`);
          }
        }
      }
    }

    // 3. Enhance reviews
    if (product.reviews && product.reviews.length > 0) {
      product.reviews.forEach((review, index) => {
        // Only replace if it looks like one of the templated ones
        if (review.text.includes('Absolutely transformed') || review.text.includes('Worth every penny') || review.text.includes('Best upgrade')) {
          review.text = uniqueReviews[(index + product.name.length) % uniqueReviews.length];
        }
      });
    }
  }

  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  console.log('Processing complete!');
}

processProducts();
