import { defineConfig } from 'vitest/config';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'happy-dom',
        globals: true,
        setupFiles: './vitest.setup.ts'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './')
        }
    }
});
