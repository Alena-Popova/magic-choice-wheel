const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 15000,
  expect: {
    timeout: 5000
  },
  use: {
    baseURL: 'http://127.0.0.1:8123',
    headless: true
  },
  webServer: {
    command: 'python3 -m http.server 8123',
    url: 'http://127.0.0.1:8123/Main-Page-Wheel.html',
    reuseExistingServer: true,
    timeout: 120000
  }
});
