const fs=require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../env/.env') });

class ConfigReader{
    static getEnvValue(key,defaultValue=null){
        return process.env[key] || defaultValue;
    }
    static getbaseURL(){
        return this.getEnvValue('BASE_URL', 'http://localhost:3000');
    }
    static getEnvironment(){
        return this.getEnvValue('ENVIRONMENT', 'QA');
    }
    static isHeadless(){    
        return this.getEnvValue('HEADLESS', 'true') === 'true';
    }
    static getBrowserTimeout() {
    return parseInt(this.getEnvValue('BROWSER_TIMEOUT', '60000'));
  }

  static getActionTimeout() {
    return parseInt(this.getEnvValue('ACTION_TIMEOUT', '30000'));
  }

  static getRetryCount() {
    return parseInt(this.getEnvValue('RETRY_COUNT', '2'));
  }
  static getTestUser() {
    return {
      username: this.getEnvValue('TEST_USERNAME'),
      password: this.getEnvValue('TEST_PASSWORD')
    };
  }

  static getAdminUser() {
    return {
      username: this.getEnvValue('ADMIN_USERNAME'),
      password: this.getEnvValue('ADMIN_PASSWORD')
    };
  }

  static getApiConfig() {
    return {
      baseUrl: this.getEnvValue('API_BASE_URL'),
      apiKey: this.getEnvValue('API_KEY'),
      timeout: parseInt(this.getEnvValue('API_TIMEOUT', '30000'))
    };
  }

  static getDbConfig() {
    return {
      host: this.getEnvValue('DB_HOST'),
      port: parseInt(this.getEnvValue('DB_PORT', '5432')),
      database: this.getEnvValue('DB_NAME'),
      username: this.getEnvValue('DB_USERNAME'),
      password: this.getEnvValue('DB_PASSWORD')
    };
  }

  static getLogConfig() {
    return {
      level: this.getEnvValue('LOG_LEVEL', 'info'),
      file: this.getEnvValue('LOG_FILE', 'logs/test-execution.log')
    };
  }

  static loadJsonData(fileName) {
    try {
      const filePath = path.join(__dirname, '..', 'data', fileName);
      const rawData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(rawData);
    } catch (error) {
      throw new Error(`Failed to load JSON data from ${fileName}: ${error.message}`);
    }
  }
  static getAllConfigs()
  {
    return {
      baseURL: this.getbaseURL(),
      environment: this.getEnvironment(),
      headless: this.isHeadless(),
      browserTimeout: this.getBrowserTimeout(),
      actionTimeout: this.getActionTimeout(),
      retryCount: this.getRetryCount(),
      testUser: this.getTestUser(),
      adminUser: this.getAdminUser(),
      apiConfig: this.getApiConfig(),
      dbConfig: this.getDbConfig(),
      logConfig: this.getLogConfig()
    };
  }

}
module.exports = ConfigReader;