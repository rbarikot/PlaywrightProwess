const { defineConfig, devices } = require('@playwright/test');
const dotenv = require('dotenv');
const path = require('path');

// Determine environment
const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';
const envFile = path.resolve(__dirname, `env1/.env.${ENVIRONMENT}`);
dotenv.config({ path: envFile });

// Debug
console.log(`✅ Loaded environment: ${ENVIRONMENT}`);
console.log(`🌐 Env file: ${envFile}`);
console.log(`🔑 BASE_URL: ${process.env.BASE_URL}`);

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [
    ['list'],
    ['allure-playwright'],
    ['html', { outputFolder: `reports/${ENVIRONMENT}` }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
