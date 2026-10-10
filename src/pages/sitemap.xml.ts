import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
 const ne=new URL('/ne/',site).href,en=new URL('/en/',site).href;
 const alternate=`<xhtml:link rel="alternate" hreflang="ne-NP" href="${ne}"/><xhtml:link rel="alternate" hreflang="en-NP" href="${en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${ne}"/>`;
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"><url><loc>${ne}</loc>${alternate}</url><url><loc>${en}</loc>${alternate}</url></urlset>`,{headers:{'Content-Type':'application/xml'}});
};
