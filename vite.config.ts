
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'sonner@2.0.3': 'sonner',
        'react-hook-form@7.55.0': 'react-hook-form',
        'figma:asset/be5b4222007ecc637bb5194974d9567e1b72e1de.png': path.resolve(__dirname, './src/assets/be5b4222007ecc637bb5194974d9567e1b72e1de.png'),
        'figma:asset/4cd72a4f09d0fbe8ab643136b41fdb815e72afdb.png': path.resolve(__dirname, './src/assets/4cd72a4f09d0fbe8ab643136b41fdb815e72afdb.png'),
        '@supabase/supabase-js@2': '@supabase/supabase-js',
        '@jsr/supabase__supabase-js@2.49.8': '@jsr/supabase__supabase-js',
        '@jsr/supabase__supabase-js@2': '@jsr/supabase__supabase-js',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });