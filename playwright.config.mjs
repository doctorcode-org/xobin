import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/browser',
    testMatch: '**/*.test.mjs',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : 2,
    reporter: [['list'], ['html', { outputFolder: 'dist/playwright-report', open: 'never' }]],
    outputDir: 'dist/browser-results',
    use: { baseURL: 'http://127.0.0.1:4179', timezoneId: 'UTC', trace: 'retain-on-failure' },
    projects: ['chromium', 'firefox', 'webkit'].map(browserName => ({ name: browserName, use: {
        browserName,
        ...(browserName === 'chromium' && process.env.XOBIN_CHROMIUM_CHANNEL ? { channel: process.env.XOBIN_CHROMIUM_CHANNEL } : {}),
    } })),
    webServer: { command: 'node tools/browser-server.mjs', url: 'http://127.0.0.1:4179', reuseExistingServer: false, timeout: 30000 },
});
