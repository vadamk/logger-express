module.exports = {
  apps: [
    {
      name: "logger",
      script: "./index.js",
      env: {
        PORT: "3000",
        ORIGIN: "https://gomonday.se",
      },
      env_production: {
        PORT: "3000",
        ORIGIN: "http://localhost:3005",
      }
    },
  ],
};
