import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.resolve(__dirname, '../src/content');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'search-index.json');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Map filenames to route paths
const ROUTE_MAP = {
  'overview.mdx': '/docs/overview',
  'authentication.mdx': '/docs/api-reference/authentication',
  'inbound.mdx': '/docs/api-reference/inbound',
  'outbound.mdx': '/docs/api-reference/outbound',
};

// Helper to create URL slugs from headings
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}

// Clean markdown/JSX syntax
function cleanContent(text) {
  if (!text) return '';
  return text
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, '') // Remove imports
    .replace(/<[^>]*>/g, '') // Remove HTML/JSX tags like <Tabs>, <Callout>
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`([^`]+)`/g, '$1') // Remove inline code ticks
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italics
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
}

const searchIndex = [];

function parseFile(filePath, filename) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const routePath = ROUTE_MAP[filename];
  
  if (!routePath) return; // Skip files not in route map

  // Extract page title (H1)
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || content.match(/^#\s+(.*)/m);
  const pageTitle = h1Match ? cleanContent(h1Match[1]) : filename.replace('.mdx', '');
  
  // We want to index the page as a whole, and then sub-sections
  // Split content by Markdown headers (## or ###)
  const sections = content.split(/^[ \t]*(##|###)\s+/m);
  
  // The first chunk is the content before the first ## (usually under the H1)
  const introContent = cleanContent(sections[0]);
  if (introContent.length > 10) {
    searchIndex.push({
      path: routePath,
      title: pageTitle,
      description: introContent.substring(0, 150) + (introContent.length > 150 ? '...' : ''),
      category: pageTitle,
      content: introContent,
    });
  }

  // Iterate over the rest of the chunks (they come in pairs: '##', 'Heading text\nContent...')
  for (let i = 1; i < sections.length; i += 2) {
    const level = sections[i]; // '##' or '###'
    const sectionBody = sections[i + 1];
    
    // The first line is the heading text
    const lines = sectionBody.split('\n');
    const headingRaw = lines[0];
    const contentRaw = lines.slice(1).join('\n');
    
    const heading = cleanContent(headingRaw);
    const slug = slugify(heading);
    const textContent = cleanContent(contentRaw);
    
    if (textContent.length > 5) {
      searchIndex.push({
        path: `${routePath}#${slug}`,
        title: heading,
        description: textContent.substring(0, 150) + (textContent.length > 150 ? '...' : ''),
        category: pageTitle,
        content: textContent,
      });
    }
  }
}

// Run parser
const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.mdx'));

files.forEach(file => {
  parseFile(path.join(CONTENT_DIR, file), file);
});

// Write to JSON
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchIndex, null, 2));
console.log(`Generated search index with ${searchIndex.length} entries at ${OUTPUT_FILE}`);
