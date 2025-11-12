export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://paridor.vercel.app';
  
  const routes = [
    { route: '', priority: 1.0, changeFrequency: 'daily' },
    { route: '/produits', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/creations', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/catalogue', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/notre-histoire', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/panier', priority: 0.5, changeFrequency: 'weekly' },
    { route: '/checkout', priority: 0.5, changeFrequency: 'weekly' },
  ];

  return routes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}


