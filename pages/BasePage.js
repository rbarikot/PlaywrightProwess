const Logger = require('../utils/Logger');
const WaitUtil = require('../utils/WaitUtil');
const ActionUtil = require('../utils/ActionsUtil');
//const ConfigReader = require('../utils/ConfigReader');

class BasePage {
    constructor(page) {
    this.page = page;
    this.logger = Logger.getInstance();
    this.waitUtil = new WaitUtil(page);
    this.actionUtil = new ActionUtil(page);
    //this.config = ConfigReader.getAllConfigs();
  }

  async navigate(url) {
    try {
      this.logger.action('NAVIGATE', '', `url: ${url}`);
      await this.page.goto(url);
    } catch (error) {
      this.logger.error(`Failed to navigate to ${url}: ${error.message}`);
      throw error;
    }
  }
}
module.exports = BasePage;