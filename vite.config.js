import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		include: []
	},
	resolve: {
		alias: {
			$src: path.resolve("./src")
		}
	}
};

export default config;
