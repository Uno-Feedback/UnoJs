module.exports = {
  entry: "./src/styles/index.scss",
  output: {
    path: "./dist",
    filename: "[name].css",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              module: true,
              localIdentName: "[name]__[local]___[hash:base64:5]",
            },
          },
          "sass-loader", // compiles Sass to CSS
        ],
      },
    ],
  },
};
