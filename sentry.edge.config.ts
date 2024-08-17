import * as Sentry from '@sentry/nextjs';

Sentry.init({
	dsn: 'https://25a009c59fc0d0871961b1953a9652e4@o4507720305999872.ingest.us.sentry.io/4507720318517248',

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for tracing.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
	// ...

	// Note: if you want to override the automatic release value, do not set a
	// `release` value here - use the environment variable `SENTRY_RELEASE`, so
	// that it will also get attached to your source maps
});
