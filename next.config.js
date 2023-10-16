// @ts-check

/**
 * @type {import("next").NextConfig}
 */
const { withSentryConfig } = require( "@sentry/nextjs" );
const nextConfig = {
	poweredByHeader: false,
	basePath: "",
	sentry: {
		tunnelRoute: "/monitoring",
		disableLogger: true,
		hideSourceMaps: true,
		widenClientFileUpload: true
	}
};

const sentryConfig = {
	org: process.env.SENTRY_ORG,
	silent: true,
	project: process.env.SENTRY_PROJECT,
	authToken: process.env.SENTRY_AUTH_TOKEN
};

module.exports = process.env.SENTRY_ENABLED === "true" ? withSentryConfig( nextConfig, sentryConfig ) : nextConfig;