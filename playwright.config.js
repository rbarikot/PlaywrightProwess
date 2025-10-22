// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Determine environment (default to 'dev' if not set)
const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';

// Resolve the correct .env file path
const envFile = path.resolve(__dirname, `env1/.env.${ENVIRONMENT}`);
dotenv.config({ path: envFile });

// Debug log to confirm
console.log(`✅ Loaded environment: ${ENVIRONMENT}`);
console.log(`🌐 Env file: ${envFile}`);
console.log(`🔑 BASE_URL: ${process.env.BASE_URL}`);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [
    ['list'],
    ['allure-playwright'],
    ['html', { outputFolder: `reports/${ENVIRONMENT}` }], // env-specific reports
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
