const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules:
     [
      {test: /\/html$/i,
       loader: "html-loader",
      },
      {
        test:/\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool:"eval-source-map",
  devServer: {
    watchFiles:["./src/template.html"],
  },
plugins:[
  new HtmlWebpackPlugin({
    template:"./src/template.html",
  }),
],
};
