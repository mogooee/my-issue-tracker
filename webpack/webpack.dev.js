const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: { compilerOptions: { noEmit: false } },
        },
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true, // 404 응답 시 index.html로 리다이렉트
    proxy: {
      '/server': {
        target: 'http://3.36.249.0:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/server': '',
        },
      },
    },
  },
});
