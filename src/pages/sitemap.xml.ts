import { defineConfig } from 'astro/config';
import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const projectPages = ['UxUnite-case', 'Artsy-case', 'CloudFirst-case', 'Firefly-case', 'Astra-case', 'ITworkshop-case'];
  
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${site.origin}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      ${projectPages.map(
        (page) => `
      <url>
        <loc>${site.origin}/${page}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      `
      ).join('')}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}