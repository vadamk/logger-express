module.exports = {
  apps: [
    {
      name: "logger",
      script: "./index.js",
      env: {
        PORT: "3000",
        ORIGIN: "https://gomonday.se,https://stripe-sca-poc-front.netlify.app",
      },
    },
  ],
};
