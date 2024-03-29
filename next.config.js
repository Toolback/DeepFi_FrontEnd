
// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	reactStrictMode: true,
// 	compiler: {
// 		removeConsole: process.env.NODE_ENV === 'production', // remove all console.*
// 		swcMinify: true // minify the bundle
// 	},
// 	exclude: ['node_modules'],
// 	images: {
// 		minimumCacheTTL: 60 * 10,
// 		deviceSizes: [660, 900, 1200, 1600, 1800]
// 	},
// 	experimental: {
// 		runtime: 'nodejs'
// 	},
// 	env: {
// 		RPC_ETHEREUM: process.env.RPC_ETHEREUM,
// 		RPC_AVALANCHE: process.env.RPC_AVALANCHE
// 	}
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
	  appDir: false,
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	  },
	// exclude: ['node_modules']
  };
  
  module.exports = nextConfig;
  