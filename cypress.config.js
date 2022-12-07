const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://flyxo.ae/',
    viewportWidth: 1020,
    viewportHeight: 673
  },
});

