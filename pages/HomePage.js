const BasePage = require('./BasePage');

class HomePage extends BasePage {
    constructor(page) {
    super(page);
    this.elements = {
      username: "//label[text()='Username']",
      password: "//label[text()='Password']",
      Submit: "//button[text()='Login']",
    };
   
  }
  async navigateToHome() {
    const homeUrl = `${this.config.baseURL}/login`;
    console.log(homeUrl);
    await this.navigate(homeUrl);

  }
  async typeUserName() {
    await this.actionUtil.type(this.elements.username,'admin');
    this.logger.step('Click User Profile');
  }
  async typePassword() {
    await this.actionUtil.type(this.elements.username,'admin');
    this.logger.step('Click User Passowrd');
  }
  async ClickLogin() {
    await this.actionUtil.click(this.elements.Submit);
    this.logger.step('Click Login');
  }

}
module.exports = HomePage;