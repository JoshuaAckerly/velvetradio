import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    let server;
    if (env.VITE_SERVER_ENV === 'production') {
        server = {
            port: 443,
            host: '0.0.0.0',
            origin: 'https://velvetradio.graveyardjokes.com',
            allowedHosts: ['velvetradio.graveyardjokes.com'],
        };
    } else if (env.VITE_SERVER_ENV === 'test' || env.VITE_SERVER_ENV === 'testing') {
        server = {
            port: 8087,
            host: '127.0.0.1',
            origin: 'http://velvetradio.graveyardjokes.testing:8087',
            allowedHosts: ['velvetradio.graveyardjokes.testing'],
        };
    } else {
        // default: local/development
        server = {
            port: 8087,
            host: '0.0.0.0',
            origin: 'http://velvetradio.graveyardjokes.local:8087',
            cors: {
                origin: [
                    'http://velvetradio.graveyardjokes.local',
                    'http://velvetradio.graveyardjokes.local:8006',
                    'http://localhost:8006',
                ],
                credentials: true
            },
            allowedHosts: ['velvetradio.graveyardjokes.local'],
        };
    }

    return {
        server,
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        esbuild: {
            jsx: 'automatic',
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'resources/js'),
                'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
                '@gj/env': resolve(__dirname, '../packages/env/src/index.ts'),
                '@gj/utils': resolve(__dirname, '../packages/utils/src/index.ts'),
                '@gj/hooks': resolve(__dirname, '../packages/hooks/src/index.ts'),
            },
            dedupe: ['react', 'react-dom'],
        },
        ssr: {
            noExternal: ['react', 'react-dom', '@inertiajs/react', '@inertiajs/core', 'axios', 'qs'],
        },
    };
});
