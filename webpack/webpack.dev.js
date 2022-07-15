const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: { compilerOptions: { noEmit: false } },
        },
      },
    ],
  },
  devServer: {
    host: "localhost",
    port: 3000,
    historyApiFallback: true, // 404 응답 시 index.html로 리다이렉트
  },
});
