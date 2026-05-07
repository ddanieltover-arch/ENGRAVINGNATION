const fs = require('fs');
const path = require('path');

const articlesPath = 'c:/Users/User/Desktop/ENGRAVING NATION/store/data/articles.json';
const publicPath = 'c:/Users/User/Desktop/ENGRAVING NATION/store/public';

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

console.log('Checking article images...');
articles.forEach(article => {
    const fullPath = path.join(publicPath, article.image);
    if (!fs.existsSync(fullPath)) {
        console.log(`[MISSING] ${article.title}: ${article.image}`);
    } else {
        console.log(`[OK] ${article.title}: ${article.image}`);
    }
});
