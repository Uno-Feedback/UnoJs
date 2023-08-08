const path = require('path');

module.exports = {
  entry: './src/styles/index.scss',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].css',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader', // compiles Sass to CSS
        ],
      },
    ],
  },
  // Configure the "webpack-dev-server" plugin
  devServer: {
    static: [
      {
        directory: path.resolve(process.cwd(), '.'),
      },
    ],
    devMiddleware: {
      index: true,
      publicPath: '.',
      serverSideRender: true,
      writeToDisk: true,
    },
    watchFiles: [path.resolve(process.cwd(), './')],
    magicHtml: true,
    compress: false,
    port: 5456,
    hot: true,
    open: true,
  },
  mode: 'development',
};
