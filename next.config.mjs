import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.cdninstagram.com',
				port: '',
				pathname: '**',
			},
		],
	},
};

// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, {
	org: 'hack49',
	project: 'hack49',

	// An auth token is required for uploading source maps.
	authToken: process.env.SENTRY_AUTH_TOKEN,

	silent: false, // Can be used to suppress logs
});
