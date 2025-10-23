// utils/MeasuringPerf.js
class MeasuringPerf {

  /**
   * Measures key page performance metrics using Navigation Timing API
   * @param {import('@playwright/test').Page} page
   * @returns {Promise<object>} performance data
   */
  async measureperf(page) {
    // Wait until the page is fully loaded
    await page.waitForLoadState('load');

    // Evaluate performance timing data inside browser context
    const perfData = await page.evaluate(() => {
      const [nav] = performance.getEntriesByType('navigation');
      return {
        url: document.location.href,
        domContentLoaded: nav?.domContentLoadedEventEnd ?? 0,
        loadEventEnd: nav?.loadEventEnd ?? 0,
        duration: nav?.duration ?? 0,
        responseTime: (nav?.responseEnd ?? 0) - (nav?.requestStart ?? 0),
        dnsLookup: (nav?.domainLookupEnd ?? 0) - (nav?.domainLookupStart ?? 0),
        tcpConnection: (nav?.connectEnd ?? 0) - (nav?.connectStart ?? 0),
        ttfb: (nav?.responseStart ?? 0) - (nav?.requestStart ?? 0)
      };
    });

    return perfData;
  }
}

module.exports = MeasuringPerf;
