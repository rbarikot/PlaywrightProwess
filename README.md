# PlaywrightProwess

## **Overview**
PlaywrightProwess is an advanced automation framework built using Playwright for end-to-end testing of web applications. It supports parallel and distributed test execution, environment-specific configurations, and integrates seamlessly with CI/CD pipelines.

---

## **Features**
- **Parallel Test Execution**: Run tests across multiple workers for faster execution.
- **Environment Management**: Dynamically load environment-specific configurations using `.env` files.
- **Page Object Model (POM)**: Encapsulate locators and actions for better test organization.
- **API Testing**: Support for API test cases.
- **Reporting**: Generate Allure and HTML reports for test results.
- **CI/CD Integration**: Automate test execution using Jenkins and Docker.

---

## **Project Structure**
```
PlaywrightProwess/
├── docker-compose.yml       # Docker configuration for CI/CD
├── Dockerfile               # Dockerfile for containerization
├── Jenkinsfile              # Jenkins pipeline configuration
├── playwright.config.js     # Playwright configuration file
├── env1/                    # Environment-specific .env files
├── tests/                   # Test scripts
├── utils/                   # Utility files for common actions
├── pages/                   # Page Object Model classes
├── reports/                 # HTML reports
├── allure-results/          # Allure report results
├── utils_api/               # API testing utilities
└── docs/                    # Documentation
```

---

## **Setup Instructions**

### **1. Prerequisites**
- Node.js (v16 or higher)
- npm (v7 or higher)
- Docker (optional, for CI/CD)

### **2. Install Dependencies**
Run the following command to install project dependencies:
```bash
npm install
```

### **3. Configure Environment**
Set the `ENVIRONMENT` variable to specify the environment (e.g., `dev`, `qa`).

Example:
```bash
set ENVIRONMENT=qa
```
Ensure the corresponding `.env` file exists in the `env1/` directory.

### **4. Run Tests**
#### Run All Tests:
```bash
npx playwright test
```
#### Run Tests with Tags:
```bash
npx playwright test --grep "@smoke"
```
#### Run Tests in Debug Mode:
```bash
npx playwright test --debug
```

### **5. Generate Reports**
Reports are generated automatically after test execution.
- **HTML Reports**: Located in the `reports/` directory.
- **Allure Reports**: Located in the `allure-results/` directory.

To view Allure reports:
```bash
allure serve allure-results
```

---

## **CI/CD Integration**
The project includes configurations for Jenkins and Docker to enable automated test execution.

### **Jenkins**
- Use the `Jenkinsfile` to configure the pipeline.
- Supports parallel execution and environment-specific testing.

### **Docker**
- Use the `Dockerfile` and `docker-compose.yml` for containerized test execution.

---

## **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with detailed information.

---

## **License**
This project is licensed under the MIT License.

---

## **Contact**
For any questions or support, please contact:
- **Author**: rbarikot
- **Email**: [rbarikot@example.com](mailto:rbarikot@example.com)