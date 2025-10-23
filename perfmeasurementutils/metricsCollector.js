// utils/metricsCollector.js
const client = require('prom-client');

// Create a global Registry (holds all metrics)
const register = new client.Registry();

// Optional: collect default Node.js process metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// Define a Gauge metric to store page load times
const pageLoadTime = new client.Gauge({
  name: 'playwright_page_load_time_ms',
  help: 'Page load time measured in milliseconds',
  labelNames: ['page', 'stage'], // e.g., 'home', 'postLogin'
});

// Register the metric
register.registerMetric(pageLoadTime);

/**
 * Record a page load time value.
 * @param {string} pageName - e.g., 'Home' or 'Login'
 * @param {string} stage - e.g., 'initial' or 'afterLogin'
 * @param {number} duration - Duration in milliseconds
 */
function recordPageLoad(pageName, stage, duration) {
  pageLoadTime.labels(pageName, stage).set(duration);
}

module.exports = {
  register,
  recordPageLoad,
};
