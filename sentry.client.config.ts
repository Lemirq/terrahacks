import * as Sentry from '@sentry/nextjs';

Sentry.init({
	dsn: 'https://25a009c59fc0d0871961b1953a9652e4@o4507720305999872.ingest.us.sentry.io/4507720318517248',
	// Replay may only be enabled for the client-side
	integrations: [Sentry.replayIntegration()],
	enabled: process.env.SENTRY === 'true',

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for tracing.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,

	// Capture Replay for 10% of all sessions,
	// plus for 100% of sessions with an error
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,

	// ...

	// Note: if you want to override the automatic release value, do not set a
	// `release` value here - use the environment variable `SENTRY_RELEASE`, so
	// that it will also get attached to your source maps
});
