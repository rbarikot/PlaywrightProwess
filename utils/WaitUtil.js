const Logger = require('./Logger');
const ConfigReader = require('./ConfigReader');

class WaitUtil {
  constructor(page) {
    this.page = page;
    this.logger = Logger.getInstance();
    this.defaultTimeout = ConfigReader.getActionTimeout();
  }

  async waitForElement(selector, options = {}) {
    const timeout = options.timeout || this.defaultTimeout;
    const state = options.state || 'visible';
    
    try {
        
      this.logger.action('WAIT_FOR_ELEMENT', selector, `state: ${state}, timeout: ${timeout}ms`);
      await this.page.waitForSelector(selector, { state, timeout });
      return await this.page.locator(selector);
    } catch (error) {
      this.logger.error(`Failed to wait for element ${selector}: ${error.message}`);
      throw error;
    }
  }

  async waitForElementToBeVisible(selector, timeout = this.defaultTimeout) {
    return await this.waitForElement(selector, { state: 'visible', timeout });
  }

  async waitForElementToBeHidden(selector, timeout = this.defaultTimeout) {
    return await this.waitForElement(selector, { state: 'hidden', timeout });
  }

  async waitForElementToBeAttached(selector, timeout = this.defaultTimeout) {
    return await this.waitForElement(selector, { state: 'attached', timeout });
  }

  async waitForElementToBeDetached(selector, timeout = this.defaultTimeout) {
    return await this.waitForElement(selector, { state: 'detached', timeout });
  }

  async waitForText(selector, text, timeout = this.defaultTimeout) {
    try {
      this.logger.action('WAIT_FOR_TEXT', selector, `text: "${text}", timeout: ${timeout}ms`);
      await this.page.waitForSelector(selector, { timeout });
      await this.page.locator(selector).filter({ hasText: text }).waitFor({ timeout });
      return await this.page.locator(selector).filter({ hasText: text });
    } catch (error) {
      this.logger.error(`Failed to wait for text "${text}" in ${selector}: ${error.message}`);
      throw error;
    }
  }

  async waitForUrl(url, timeout = this.defaultTimeout) {
    try {
      this.logger.action('WAIT_FOR_URL', '', `url: ${url}, timeout: ${timeout}ms`);
      await this.page.waitForURL(url, { timeout });
    } catch (error) {
      this.logger.error(`Failed to wait for URL ${url}: ${error.message}`);
      throw error;
    }
  }

  async waitForLoadState(state = 'load', timeout = this.defaultTimeout) {
    try {
      this.logger.action('WAIT_FOR_LOAD_STATE', '', `state: ${state}, timeout: ${timeout}ms`);
      await this.page.waitForLoadState(state, { timeout });
    } catch (error) {
      this.logger.error(`Failed to wait for load state ${state}: ${error.message}`);
      throw error;
    }
  }

  async waitForNetworkIdle(timeout = this.defaultTimeout) {
    return await this.waitForLoadState('networkidle', timeout);
  }

  async waitForDOMContentLoaded(timeout = this.defaultTimeout) {
    return await this.waitForLoadState('domcontentloaded', timeout);
  }

  async waitForFunction(fn, arg = null, timeout = this.defaultTimeout) {
    try {
      this.logger.action('WAIT_FOR_FUNCTION', '', `timeout: ${timeout}ms`);
      return await this.page.waitForFunction(fn, arg, { timeout });
    } catch (error) {
      this.logger.error(`Failed to wait for function: ${error.message}`);
      throw error;
    }
  }

  async waitForResponse(urlPattern, timeout = this.defaultTimeout) {
    try {
      this.logger.action('WAIT_FOR_RESPONSE', '', `pattern: ${urlPattern}, timeout: ${timeout}ms`);
      return await this.page.waitForResponse(urlPattern, { timeout });
    } catch (error) {
      this.logger.error(`Failed to wait for response ${urlPattern}: ${error.message}`);
      throw error;
    }
  }

  async waitForRequest(urlPattern, timeout = this.defaultTimeout) {
    try {
      this.logger.action('WAIT_FOR_REQUEST', '', `pattern: ${urlPattern}, timeout: ${timeout}ms`);
      return await this.page.waitForRequest(urlPattern, { timeout });
    } catch (error) {
      this.logger.error(`Failed to wait for request ${urlPattern}: ${error.message}`);
      throw error;
    }
  }

  async sleep(milliseconds) {
    this.logger.action('SLEEP', '', `duration: ${milliseconds}ms`);
    await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  async waitForElementCount(selector, count, timeout = this.defaultTimeout) {
    try {
      this.logger.action('WAIT_FOR_ELEMENT_COUNT', selector, `count: ${count}, timeout: ${timeout}ms`);
      
      const endTime = Date.now() + timeout;
      while (Date.now() < endTime) {
        const elements = await this.page.locator(selector).count();
        if (elements === count) {
          return true;
        }
        await this.sleep(100);
      }
      throw new Error(`Expected ${count} elements matching ${selector}, but found different count`);
    } catch (error) {
      this.logger.error(`Failed to wait for element count: ${error.message}`);
      throw error;
    }
  }

  async waitForElementToContainText(selector, text, timeout = this.defaultTimeout) {
    try {
      this.logger.action('WAIT_FOR_ELEMENT_TEXT', selector, `text: "${text}", timeout: ${timeout}ms`);
      await this.page.locator(selector).filter({ hasText: text }).waitFor({ timeout });
      return await this.page.locator(selector);
    } catch (error) {
      this.logger.error(`Failed to wait for element to contain text: ${error.message}`);
      throw error;
    }
  }
}

module.exports = WaitUtil;