"use strict";
const WebpackConfigHelpers = require("razzle-dev-utils/WebpackConfigHelpers");
const Helpers = new WebpackConfigHelpers(process.cwd());

const defaultOptions = {
  svgr: {
    dev: {
      svgoConfig: {
        plugins: [{ removeViewBox: false }, { mergePaths: false }, { removeTitle: false }],
      },
    },
    prod: {
      svgoConfig: {
        plugins: [{ removeViewBox: false }, { mergePaths: false }, { removeTitle: false }],
      },
    },
  },
};

module.exports = (defaultConfig, { target, dev }, webpack, userOptions = {}) => {
  const config = Object.assign({}, defaultConfig);

  const options = Object.assign({}, defaultOptions, userOptions);

  // Exclude from file-loader
  config.module.rules[config.module.rules.findIndex(Helpers.makeLoaderFinder("file-loader"))].exclude.push(/\.(svg)$/);

  const constantEnv = dev ? "dev" : "prod";

  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve("@svgr/webpack"),
          options: options.svgr[constantEnv],
        },
      ],
    },
  ];

  return config;
};
