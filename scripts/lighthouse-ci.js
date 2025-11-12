/**
 * Script Lighthouse CI pour audit automatique après build
 * Usage: node scripts/lighthouse-ci.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

// Pages à auditer
const pages = [
  '/',
  '/creations',
  '/produits',
  '/contact',
  '/panier',
];

// Scores minimums requis
const thresholds = {
  performance: 95,
  accessibility: 90,
  'best-practices': 100,
  seo: 95,
};

console.log('🚀 Démarrage de l\'audit Lighthouse...\n');

// Vérifier si Lighthouse est installé
try {
  execSync('npx lighthouse --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Lighthouse n\'est pas installé. Installation...');
  execSync('npm install -g lighthouse', { stdio: 'inherit' });
}

const results = [];

// Auditer chaque page
pages.forEach((page, index) => {
  console.log(`\n📊 Audit de ${page} (${index + 1}/${pages.length})...`);
  
  try {
    const outputPath = path.join(process.cwd(), `lighthouse-${page.replace(/\//g, '-') || 'home'}.json`);
    
    const command = `npx lighthouse "${BASE_URL}${page}" \
      --output=json \
      --output-path="${outputPath}" \
      --chrome-flags="--headless --no-sandbox" \
      --only-categories=performance,accessibility,best-practices,seo \
      --quiet`;
    
    execSync(command, { stdio: 'pipe' });
    
    const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    const scores = {
      performance: Math.round(report.categories.performance.score * 100),
      accessibility: Math.round(report.categories.accessibility.score * 100),
      'best-practices': Math.round(report.categories['best-practices'].score * 100),
      seo: Math.round(report.categories.seo.score * 100),
    };
    
    results.push({ page, scores, report });
    
    console.log(`✅ Performance: ${scores.performance}/100`);
    console.log(`✅ Accessibility: ${scores.accessibility}/100`);
    console.log(`✅ Best Practices: ${scores['best-practices']}/100`);
    console.log(`✅ SEO: ${scores.seo}/100`);
    
    // Vérifier les seuils
    let passed = true;
    Object.keys(thresholds).forEach((key) => {
      if (scores[key] < thresholds[key]) {
        console.error(`❌ ${key}: ${scores[key]} < ${thresholds[key]}`);
        passed = false;
      }
    });
    
    if (!passed) {
      console.error(`\n❌ La page ${page} ne respecte pas les seuils minimums.`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors de l'audit de ${page}:`, error.message);
  }
});

// Générer un rapport résumé
const summaryPath = path.join(process.cwd(), 'lighthouse-summary.json');
const summary = {
  date: new Date().toISOString(),
  thresholds,
  results: results.map(({ page, scores }) => ({ page, scores })),
  average: {
    performance: Math.round(results.reduce((sum, r) => sum + r.scores.performance, 0) / results.length),
    accessibility: Math.round(results.reduce((sum, r) => sum + r.scores.accessibility, 0) / results.length),
    'best-practices': Math.round(results.reduce((sum, r) => sum + r.scores['best-practices'], 0) / results.length),
    seo: Math.round(results.reduce((sum, r) => sum + r.scores.seo, 0) / results.length),
  },
};

fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

console.log('\n📊 Résumé des audits:');
console.log(JSON.stringify(summary, null, 2));

// Vérifier si tous les scores sont au-dessus des seuils
const allPassed = results.every(({ scores }) => {
  return Object.keys(thresholds).every((key) => scores[key] >= thresholds[key]);
});

if (!allPassed) {
  console.error('\n❌ Certaines pages ne respectent pas les seuils minimums.');
  process.exit(1);
} else {
  console.log('\n✅ Toutes les pages respectent les seuils minimums!');
  process.exit(0);
}

