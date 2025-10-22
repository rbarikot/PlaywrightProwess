import { test, expect } from '@playwright/test';
const ConfigReader=require('../utils/ConfigReader');
const HomePage = require('../pages/HomePage');

test.describe('Login Functionality', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    // Navigate to login page
    await homePage.navigateToHome();
  });

  test('@regression Valid user login',{tag: ['@smoke','@critical','@regression']}, async ({ page }) => {
     await homePage.typeUserName();
      await homePage.typePassword();
      await homePage.ClickLogin();
      });
});