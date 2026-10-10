import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
if (existsSync('.env')) loadEnvFile('.env');
const origin = process.env.SITE_URL || 'https://example.com';
if (process.env.SITE_URL && (!/^https:\/\//.test(origin) || new URL(origin).pathname !== '/')) {
  throw new Error('SITE_URL must be an HTTPS origin without a path.');
}
export default defineConfig({ site: origin, output: 'static', trailingSlash: 'always' });
