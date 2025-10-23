// tests/LoginPerfTest.spec.js
import { test, expect } from '@playwright/test';
const ConfigReader = require('../utils/ConfigReader');
const HomePage = require('../pages/HomePage');
const MeasuringPerf = require('../perfmeasurementutils/MeasuringPerf'); // <-- match class/file name
//const { register, recordPageLoad } = require('../perfmeasurementutils//metricsCollector');
const fs = require('fs');

test.describe('Login Functionality', () => {
  let homePage;
  let perfUtil;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    perfUtil = new MeasuringPerf();

    // Navigate to login page (ensure navigateToHome waits for load)
    await homePage.navigateToHome();

    // Measure performance AFTER navigation
    const perfData = await perfUtil.measureperf(page);
    console.log('📊 Performance Data:', perfData);

   // recordPageLoad('HomePage', 'initial', perfData.duration);
  });

  test('@smoke Valid user login with performance Data', async ({ page }) => {
    // NOTE: reuse the same pattern — create a fresh perfUtil if you need it here
    // but avoid redeclaring the same variable name if already declared in beforeEach

    // perform login
    await homePage.typeUserName();
    await homePage.typePassword();
    await homePage.ClickLogin();

    // measure after login (recreate util or reuse if available in scope)
    const postLoginPerfUtil = new MeasuringPerf();
    const postLoginPerf = await postLoginPerfUtil.measureperf(page);
    console.log('📈 Post-login Performance:', postLoginPerf);

    //recordPageLoad('HomePage', 'postLogin', postLoginPerf.duration);

    // Example assertion (adjust threshold as required)
    expect(postLoginPerf.duration).toBeLessThan(3000);

    //const metricsData = await register.metrics();
    //fs.writeFileSync('metrics.prom', metricsData);
   // console.log('✅ Metrics saved to metrics.prom'); 
  });
});
