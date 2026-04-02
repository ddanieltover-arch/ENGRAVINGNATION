const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Configuration
const productsFilePath = path.join(__dirname, '../data/products.json');
const articlesFilePath = path.join(__dirname, '../data/articles.json');
const SUPABASE_URL = 'https://dbnqxojbamfoexfrsext.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRibnF4b2piYW1mb2V4ZnJzZXh0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDY5NDY0OSwiZXhwIjoyMDkwMjcwNjQ5fQ.Yy7HG2-lTcYhURZE27SPo6hkZuuZ4say5EpEGLbfYrA';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const firstNames = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzales', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

const reviewTemplates = [
  "Absolutely transformed the look of my {vehicle}. The engraving detail is insane up close.",
  "Worth every penny. The {product} feels heavy and high-quality, not like those cheap plastic covers.",
  "Installation on my {year} {vehicle} was a breeze. Fits like a glove and looks custom as hell.",
  "I've been looking for custom {category} for a while, and Engraving Nation really delivered. 10/10.",
  "The black finish on this {product} is perfect. No chips or fading after 3 months in the sun.",
  "Got these for my show truck and they are always a talking point. Great craftsmanship.",
  "Customer service helped me pick the right size for my {year} build. Fast shipping too.",
  "The hand-engraved scroll work is beautiful. You can tell real effort went into this {product}.",
  "Best upgrade I've done to my {vehicle} this year. Subtle but very high-end.",
  "Perfect fit for the {year} model. The packaging was very secure and arrived without a scratch.",
  "Highly recommend these for anyone wanting a unique look. The {category} engraving is top-tier.",
  "Better than OEM. The {product} adds that custom touch that the factory badges are missing.",
  "Used their WhatsApp chat to confirm fitment for my {vehicle} and they were super helpful.",
  "The contrast on the {product} between the black coating and the engraving is stunning.",
  "This is my second order from Engraving Nation. Consistently great work on their {category}.",
  "Real metal, real engraving. No fake stickers here. My {vehicle} looks much more premium now.",
  "If you're on the fence, just get them. The {product} is a total game changer for the front end.",
  "Precision work. The lines are clean and the symmetry is perfect on my {product}.",
  "I get compliments at every gas station. People can't believe the {product} is hand-engraved.",
  "Solid build, fast delivery, and looks amazing on my {year} {vehicle}. Very happy."
];

function generateReviews(productName, category, year = '2022', genericVehicle = 'truck') {
  const reviews = [];
  const usedNames = new Set();
  
  for (let i = 0; i < 20; i++) {
    let name;
    do {
      name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    } while (usedNames.has(name));
    usedNames.add(name);

    const template = reviewTemplates[i % reviewTemplates.length];
    const text = template
      .replace(/{vehicle}/g, genericVehicle)
      .replace(/{product}/g, productName.toLowerCase().replace('99-06','').replace('2 pcs','').trim())
      .replace(/{year}/g, year)
      .replace(/{category}/g, category);

    const date = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    reviews.push({
      author: name,
      rating: Math.random() > 0.8 ? 4 : 5,
      text: text,
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });
  }
  return reviews;
}

async function syncArticles() {
  if (!fs.existsSync(articlesFilePath)) return;
  const articles = JSON.parse(fs.readFileSync(articlesFilePath, 'utf8'));
  console.log(`Syncing ${articles.length} articles to Supabase...`);

  for (const article of articles) {
    console.log(`  Syncing article: ${article.title}`);
    
    // Use upsert to create or update
    const { error } = await supabase
      .from('articles')
      .upsert({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
        category: article.category,
        author: article.author,
        published_at: article.published_at || article.publishedAt,
        seo_title: article.seoMetadata?.title,
        seo_description: article.seoMetadata?.description
      }, { onConflict: 'slug' });

    if (error) {
      console.error(`    Error syncing ${article.slug}:`, error.message);
    }
  }
}

async function run() {
  console.log('--- EN CONTENT ENRICHER START ---');
  
  // 1. Sync Products
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
  console.log(`Processing ${products.length} products...`);

  for (const product of products) {
    if (product.slug === 'sys_settings') continue;

    const category = product.categories?.[0] || 'emblems';
    const year = product.name.includes('07-13') ? '2012' : (product.name.includes('99-06') ? '2004' : '2023');
    const vehicle = product.name.toLowerCase().includes('gmc') ? 'GMC Sierra' : (product.name.toLowerCase().includes('chevy') ? 'Silverado' : 'truck');

    // Generate 20 Unique Reviews if missing
    if (!product.reviews || product.reviews.length === 0) {
      product.reviews = generateReviews(product.name, category, year, vehicle);
    }

    // Inject Internal Links (Strategic)
    if (!product.description.includes('href=')) {
      const linkHtml = `\n\nLooking for more? Check out our <a href="/gallery" class="text-brand-gold hover:underline">Build Showcase</a> for inspiration or browse our <a href="/products" class="text-brand-gold hover:underline">Full Collection</a> of custom items.`;
      product.description += linkHtml;
    }

    // Update Supabase
    const { error } = await supabase
      .from('products')
      .update({ 
        reviews: product.reviews,
        description: product.description 
      })
      .eq('slug', product.slug);

    if (error) {
      console.log(`  Skip update for ${product.slug} (Table may not exist or connection issue)`);
    }
  }

  // 2. Sync Articles
  await syncArticles();

  // 3. Save to Local JSON
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  console.log('--- EN CONTENT ENRICHER COMPLETE ---');
}

run().catch(console.error);

run().catch(console.error);
