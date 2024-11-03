// webpack.config.js

module.exports = {
    module: {
      rules: [
        {
          // 省略
        },
      ],
    },
    experiments: {
      topLevelAwait: true,
    },
    plugins: [],
  };