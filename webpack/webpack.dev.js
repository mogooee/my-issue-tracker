const { merge } = require('webpack-merge');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  cache: {
    // 재빌드 시간 단축
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        include: path.resolve(__dirname, '..', 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: { compilerOptions: { noEmit: false }, transpileOnly: true },
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
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
        static: { directory: path.resolve(__dirname, '..', 'build') },
      },
    },
  },
});
