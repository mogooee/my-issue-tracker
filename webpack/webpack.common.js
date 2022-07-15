const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

require("dotenv").config();

module.exports = {
  entry: path.resolve(__dirname, "..", "src", "index.tsx"),
  output: {
    path: path.join(__dirname, "..", "build"),
    filename: "bundle.js",
    assetModuleFilename: "assets/[name][ext]",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "public", "index.html"),
    }),
  ],
};
