import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const read = p => readFileSync(`dist/${p}`, 'utf8');
for (const lang of ['ne','en']) {
 const html=read(`${lang}/index.html`);
 assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`${lang}: one H1`);
 assert(html.includes(`lang="${lang}"`));
 for(const id of ['home','about','services','practice','resources','faq','contact'])assert(html.includes(`id="${id}"`),id);
 for(const match of html.matchAll(/href="(tel:[^"]+)"/g))assert.equal(match[1],'tel:+9779851159807');
 for(const match of html.matchAll(/href="(mailto:[^"]+)"/g))assert.equal(match[1],'mailto:dinesh.duwadi@gmail.com');
 for(const match of html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/g)){
  assert(existsSync(`dist${match[1]}`),`Missing image ${match[1]}`);
  assert(/alt="[^"]+"/.test(match[0]),'Image alt');
  assert(/width="\d+"/.test(match[0])&&/height="\d+"/.test(match[0]),'Image dimensions');
 }
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert.equal(schema['@graph'].find(e=>e['@type']==='FAQPage').mainEntity.length,5);
 assert.equal(schema['@graph'].find(e=>e['@type']==='Person').name,'Dinesh Duwadi');
 for(const code of ['ne-NP','en-NP','x-default'])assert(html.includes(`hreflang="${code}"`));
 assert(html.includes('rel="canonical"'));
 assert(html.includes('name="twitter:card"'));
 assert(!/lorem ipsum|99% success|5000\+ cases/i.test(html));
}
assert(read('robots.txt').includes('Allow: /'));
assert.equal((read('sitemap.xml').match(/<loc>/g)||[]).length,2);
for(const file of ['404.html','social.jpg','favicon.svg','apple-touch-icon.png','_headers','_redirects'])assert(existsSync(`dist/${file}`),file);
const production=process.env.SITE_URL && process.env.SITE_URL!=='https://example.com';
console.log('Verified both languages, links, images, structured data, metadata and deployment files.');
if(!production)console.warn('Preview build: set SITE_URL to the real HTTPS domain for indexable production metadata.');
