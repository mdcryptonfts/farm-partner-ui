// webpack.config.js
module.exports = function override(config, env) {
  if (env === 'development') {
    console.log("DEV")
    config.devServer.overlay = false;
  }
  return config;
};
