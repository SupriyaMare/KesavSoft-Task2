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

export default defineConfig({
  root: templatesDir,
  publicDir: resolve(__dirname, 'src/assets'),
  plugins: [
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
