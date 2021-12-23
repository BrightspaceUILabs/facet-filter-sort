import config from './web-test-runner.config.js';
import { createSauceLabsLauncher } from '@web/test-runner-saucelabs';

const sauceLabsOptions = {
	// eslint-disable-next-line no-undef
	user: process.env.SAUCE_USERNAME,
	// eslint-disable-next-line no-undef
	key: process.env.SAUCE_ACCESS_KEY,
};

const sauceLabsCapabilities = {
	name: '@brightspace-ui-labs/facet-filter-sort unit tests',
	// eslint-disable-next-line no-undef
	build: `@brightspace-ui-labs/facet-filter-sort ${process.env.GITHUB_REF ?? 'local'} build ${process.env.GITHUB_RUN_NUMBER ?? ''}`
};

const sauceLabsLauncher = createSauceLabsLauncher(
	sauceLabsOptions,
	sauceLabsCapabilities
);

const extraOptions = {
	idleTimeout: 500 // default 90
};

config.browsers = [
	sauceLabsLauncher({
		browserName: 'chrome',
		browserVersion: 'latest',
		platformName: 'macOS 11.00',
		'sauce:options': extraOptions
	}),
	sauceLabsLauncher({
		browserName: 'firefox',
		browserVersion: 'latest',
		platformName: 'macOS 11.00',
		'sauce:options': extraOptions
	}),
	sauceLabsLauncher({
		browserName: 'safari',
		browserVersion: 'latest',
		platformName: 'macOS 11.00',
		'sauce:options': extraOptions
	}),
	sauceLabsLauncher({
		browserName: 'microsoftedge',
		browserVersion: 'latest',
		platformName: 'Windows 10',
		'sauce:options': extraOptions
	}),
];
// Concurrent browsers
// Most SauceLabs accounts have a max of 4
config.concurrentBrowsers = 4;

export default config;
