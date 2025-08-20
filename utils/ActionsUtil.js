const Logger = require('./Logger');
const WaitUtil = require('./WaitUtil');
const ConfigReader = require('./ConfigReader');

  class ActionUtil {
    constructor(page) {
    this.page = page;
    this.logger = Logger.getInstance();
    this.waitUtil = new WaitUtil(page);
    this.defaultTimeout = ConfigReader.getActionTimeout();
  }

  async click(selector, options = {}) {
    try {
      const timeout = options.timeout || this.defaultTimeout;
      this.logger.action('CLICK', selector, `timeout: ${timeout}ms`);      
      await this.waitUtil.waitForElementToBeVisible(selector, timeout);
      const element = this.page.locator(selector);
      await element.click(options);
    } catch (error) {
      this.logger.error(`Failed to click element ${selector}: ${error.message}`);
      throw error;
    }
  }
 async type(selector, text, options = {}) {
  try {
    const timeout = options.timeout || this.defaultTimeout;
    this.logger.action('TYPE', selector, `text: "${text}", timeout: ${timeout}ms`);

    await this.waitUtil.waitForElementToBeVisible(selector, timeout);
    const element = this.page.locator(selector);

    if (options.clear !== false) {
    await element.fill(''); 
    }

    // Extract only supported options for fill()
    const { clear, ...playwrightOptions } = options;

    await element.fill(text, playwrightOptions);
  } catch (error) {
    this.logger.error(`Failed to type in element ${selector}: ${error.message}`);
    throw error;
  }
}
    
}
module.exports = ActionUtil;