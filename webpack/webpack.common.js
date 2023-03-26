/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

require('dotenv').config();

module.exports = {
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'js/[name]-[chunkhash].js',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        include: path.resolve(__dirname, '..', 'src'),
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: path.resolve(__dirname, '..', 'src'),
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
        include: path.resolve(__dirname, '..', 'src'),
        resourceQuery: /inline/, // *.svg?inline
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        include: path.resolve(__dirname, '..', 'src'),
        use: {
          loader: '@svgr/webpack',
        },
        resourceQuery: { not: [/inline/] },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
      publicPath: '/',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(process.env) }),
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    // }),
  ],
};
