# Use Microsoft’s official Playwright base image (includes browsers + deps)
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

# Set working directory
WORKDIR /work

# Copy package.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Ensure writable directories exist
RUN mkdir -p /work/playwright-report /work/reports && chmod -R 777 /work

# Copy env files (optional for caching)
COPY env1/.env.* /work/env1/

# Install browsers
RUN npx playwright install --with-deps

# Set default environment (can be overridden by docker-compose)
ENV ENVIRONMENT=dev
ENV HEADLESS=true


# Default command — overridden by docker-compose if needed
CMD ["sh", "-c", "echo 'ENV=${ENVIRONMENT}' && npx playwright test"]

