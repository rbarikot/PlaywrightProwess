const { test, expect } = require('@playwright/test');

test.describe('Login Page - Successful Login', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://10.119.32.132:8084/da/login');

    // Enter username
    await page.getByRole('textbox', { name: 'Username' }).fill('admin');

    // Enter password
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');

    // Click the login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert redirection to the dashboard
    await expect(page).toHaveURL('http://10.119.32.132:8084/da/app');

    // Assert the page title remains 'DA'
    await expect(page).toHaveTitle('DA');
  });
});