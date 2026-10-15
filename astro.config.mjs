import { defineConfig } from 'astro/config';
// TODO: update `site` once the final Vercel URL / domain is known (also public/robots.txt).
export default defineConfig({ site: 'https://buildstack.vercel.app', output: 'static', trailingSlash: 'always', build: { format: 'directory' } });
