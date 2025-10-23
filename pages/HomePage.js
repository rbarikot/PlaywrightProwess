const BasePage = require('./BasePage');
const homePageLocators  = require('../locators/HomePageLocator');

class HomePage extends BasePage {
    constructor(page) {
    super(page);
    this.elements = homePageLocators;
   
  }
  async navigateToHome() {
    const homeUrl = process.env.BASE_URL;
    console.log(homeUrl);
    await this.navigate(homeUrl);

  }
  async typeUserName() {
    await this.actionUtil.type(this.elements.username,process.env.TEST_USERNAME);
    this.logger.step('Click User Profile');
  }
  async typePassword() {
    await this.actionUtil.type(this.elements.username,process.env.TEST_PASSWORD);
    this.logger.step('Click User Passowrd');
  }
  async ClickLogin() {
    await this.actionUtil.click(this.elements.Submit);
    this.logger.step('Click Login');
  }

}
module.exports = HomePage;