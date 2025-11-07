export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://paridor.vercel.app';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/checkout', '/panier', '/mes-commandes', '/success', '/cancel'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

