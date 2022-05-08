const currentTask = process.env.npm_lifecycle_event
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const config = {
  entry: "./src/index.js",
  output: {
    filename: "main.[fullhash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    port: 3000,
    static: __dirname + "/src/",
    client: {
      reconnect: true,
    },
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3, "targets": "defaults" }], "@babel/preset-react"]
          }
        }
      },
      {
          test: /\.(svg|eot|woff|woff2|ttf|png|jpe?g|gif)$/,
          use: ['file-loader']
      }
    ]
  }
}

if (currentTask == "build") {
  config.mode = "production"
  config.module.rules[0].use[0] = MiniCssExtractPlugin.loader
  config.plugins.push(new MiniCssExtractPlugin({ filename: "main.[fullhash].css" }), new CleanWebpackPlugin())
}

module.exports = config