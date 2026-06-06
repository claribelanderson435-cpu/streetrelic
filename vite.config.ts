import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import cloudIDEReactRefresh from '@coze-arch/vite-plugin-react-refresh-cloudide';


function getPlugins() {
  const plugins = [cloudIDEReactRefresh(),react(), tsconfigPaths()];
  return plugins;
}

export default defineConfig({
  plugins: getPlugins(),
  // 在生产环境中禁用缓存，避免创建临时目录
  cacheDir: process.env.NODE_ENV === 'production' ? false : 'node_modules/.vite',
  server: {
    port: 5000,
    host: '0.0.0.0',
    hmr: {
      overlay: true,
      path: '/hot/vite-hmr',
      port: 6000,
      clientPort: 443,
      timeout: 30000,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    assetsInlineLimit: 4096, // 4kb - inline smaller images as base64
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animation: ['framer-motion'],
        },
      },
    },
  },
  preview: {
    port: 5000,
    host: '0.0.0.0',
  },
});
