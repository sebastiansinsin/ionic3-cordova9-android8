var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

var env = process.env.MY_ENV || process.env.my_env;

if (env === 'prod') {
  useDefaultConfig.prod.resolve.alias = {
    "@app/env": path.resolve(environmentPath('prod'))
  };
}

if (env === 'dev') {
  useDefaultConfig.dev.resolve.alias = {
    "@app/env": path.resolve(environmentPath('dev'))
  };
}

if (env === 'staging-dev') {
  useDefaultConfig.dev.resolve.alias = {
    "@app/env": path.resolve(environmentPath('staging'))
  };
}

if (env === 'staging-beta') {
  useDefaultConfig.prod.resolve.alias = {
    "@app/env": path.resolve(environmentPath('staging-beta'))
  };
}

if (env === 'dev-beta') {
  useDefaultConfig.prod.resolve.alias = {
    "@app/env": path.resolve(environmentPath('dev-beta'))
  };
}

if (env === 'prod-dev') {
  useDefaultConfig.dev.resolve.alias = {
    "@app/env": path.resolve(environmentPath('prod-dev'))
  };
}

if (!env) {
  // Default to dev config
  useDefaultConfig[env] = useDefaultConfig.dev;
  useDefaultConfig[env].resolve.alias = {
    "@app/env": path.resolve(environmentPath(env))
  };
}

function environmentPath(env) {
  var filePath = './src/environments/environment' + (env === 'prod' ? '' : '.' + env) + '.ts';
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }

}

module.exports = function () {
  return useDefaultConfig;
};