const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./game.ts"],
  resolve: {
    extensions: [".ts"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js"
  }
};