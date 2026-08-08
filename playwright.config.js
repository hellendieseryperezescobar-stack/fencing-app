module.exports = {
  use: {
    baseURL: 'http://127.0.0.1:8000',
    headless: true,
    ignoreHTTPSErrors: true,
  },
  retries: 0,
  timeout: 30000,
  reporter: [['list']]
};
