import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolve = (p) => path.resolve(__dirname, '..', p);

const template = fs.readFileSync(resolve('dist/static/index.html'), 'utf-8');
const serverEntryPath = resolve('dist/server/entry-server.js');
const { render } = await import(pathToFileURL(serverEntryPath).href);

const routesToPrerender = [
  '/',
  '/privacy',
  '/terms',
  '/docs/overview',
  '/docs/api-reference/authentication',
  '/docs/api-reference/inbound',
  '/docs/api-reference/outbound'
];

(async () => {
  console.log('Starting prerender pipeline...');
  
  for (const url of routesToPrerender) {
    const { html } = render(url);
    
    // Inject the stringified React tree into the HTML template
    const finalHtml = template.replace(`<!--app-html-->`, html);
    
    // Determine the output path
    const routePath = url === '/' ? '/index.html' : `${url}/index.html`;
    const absolutePath = resolve(`dist/static${routePath}`);
    const dir = path.dirname(absolutePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(absolutePath, finalHtml);
    console.log(`pre-rendered: ${routePath}`);
  }
  
  console.log('Prerendering completed.');
})();
