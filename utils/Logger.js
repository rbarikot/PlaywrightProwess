const winston = require('winston');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const ConfigReader = require('./ConfigReader');

class Logger {
  static instance = null;
  
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }

    const logConfig = ConfigReader.getLogConfig();
    const logDir = path.dirname(logConfig.file);
    
    // Ensure log directory exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    this.logger = winston.createLogger({
      level: logConfig.level,
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => moment().format('YYYY-MM-DD HH:mm:ss.SSS')
        }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
          if (stack) {
            logMessage += `\n${stack}`;
          }
          return logMessage;
        })
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] ${level}: ${message}`;
            })
          )
        }),
        new winston.transports.File({
          filename: logConfig.file,
          maxsize: 10485760, // 10MB
          maxFiles: 5,
          tailable: true
        })
      ]
    });

    Logger.instance = this;
  }

  static getInstance() {
    if (!Logger.instance) {
      new Logger();
    }
    return Logger.instance;
  }

  info(message, meta = {}) {
    this.logger.info(message, meta);
  }

  debug(message, meta = {}) {
    this.logger.debug(message, meta);
  }

  warn(message, meta = {}) {
    this.logger.warn(message, meta);
  }

  error(message, meta = {}) {
    this.logger.error(message, meta);
  }

  step(stepName, message = '') {
    this.info(`STEP: ${stepName} ${message}`);
  }

  testStart(testName) {
    this.info(`TEST STARTED: ${testName}`);
    this.info('='.repeat(80));
  }

  testEnd(testName, status) {
    this.info('='.repeat(80));
    this.info(`TEST ${status.toUpperCase()}: ${testName}`);
  }

  action(action, element = '', message = '') {
    this.info(`ACTION: ${action} ${element} ${message}`);
  }

  api(method, url, status, responseTime) {
    this.info(`API: ${method} ${url} - Status: ${status} - Time: ${responseTime}ms`);
  }

  screenshot(fileName) {
    this.info(`SCREENSHOT: ${fileName}`);
  }
}

module.exports = Logger;