# Use Microsoft’s official Playwright base image (includes browsers + deps)
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

# Set working dir inside container
WORKDIR /work

# Copy package.json first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Install Playwright browsers (Chromium, Firefox, WebKit)
RUN npx playwright install --with-deps

# Default env (overridable in docker-compose or CLI)
ENV HEADLESS=true

# Run tests by default
CMD ["npx", "playwright", "test"]
