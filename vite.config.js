import { defineConfig } from 'vite';
import nunjucksPlugin from 'vite-plugin-nunjucks';
import nunjucks from 'nunjucks';
import { resolve } from 'path';

const templatesDir = resolve(__dirname, 'src/templates');
const nunjucksEnv = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(templatesDir),
  {
    noCache: true,
    autoescape: false,
  }
);

function nunjucksDevMiddleware(nunjucksEnv) {
  const pageMap = new Map([
    ['/', 'index.html'],
    ['/index.html', 'index.html'],
    ['/about.html', 'about.html'],
    ['/contact.html', 'contact.html'],
  ]);

  return {
    name: 'nunjucks-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const url = req.url.split('?')[0];
          if (req.method === 'GET' && pageMap.has(url)) {
            const template = pageMap.get(url);
            const html = nunjucksEnv.render(template, {});
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(html);
            return;
          }
        } catch (err) {
          server.config.logger.error(err.stack || err.message || err);
          res.statusCode = 500;
          res.end('Template render error');
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  root: templatesDir,
  publicDir: resolve(__dirname, 'src/assets'),
  plugins: [
    nunjucksDevMiddleware(nunjucksEnv),
    nunjucksPlugin({
      nunjucksEnvironment: nunjucksEnv,
      templatesDir,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/templates/index.html'),
        about: resolve(__dirname, 'src/templates/about.html'),
        contact: resolve(__dirname, 'src/templates/contact.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg|webp|ico/.test(ext)) {
            return `images/[name]-[hash][extname]`;
          } else if (/woff|woff2|ttf|otf|eot/.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          } else if (ext === 'css') {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    fs: {
      allow: [resolve(__dirname, 'src')],
    },
  },
});
