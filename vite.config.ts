import path from 'node:path';

import { PackageJson } from 'type-fest';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import manifest from './package.json';

const { name } = manifest as PackageJson;
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            fileName: 'index',
            formats: ['es', 'cjs'],
            name,
        },
        minify: true,
    },
    plugins: [dts({ rollupTypes: true })],
    test: {
        coverage: {
            reporter: ['text', 'lcov'],
        },
        globals: true,
        include: ['tests/**/*.spec.ts'],
    },
});
