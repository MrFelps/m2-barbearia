import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'sync-hero-settings',
      configureServer(server) {
        server.middlewares.use('/api/sync-settings', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                fs.writeFileSync(path.resolve(__dirname, 'src/data/savedHeroSettings.json'), body);
              } catch {
                // ignore
              }
              res.statusCode = 200;
              res.end('ok');
            });
          } else {
            res.end();
          }
        });
      },
    },
  ],
  server: {
    port: 3000,
    open: false,
  },
});
