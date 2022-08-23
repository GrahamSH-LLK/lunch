import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
		optimizeDeps: {
		  include: ['locale']
		}
	  
  
};

export default config;
