/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://paridor.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-2025-secret/', '/api/'],
      },
    ],
  },
  exclude: ['/admin-2025-secret/*', '/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Priorités personnalisées
    const priorityMap = {
      '/': 1.0,
      '/produits': 0.9,
      '/creations': 0.9,
      '/notre-histoire': 0.8,
      '/contact': 0.8,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityMap[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};


