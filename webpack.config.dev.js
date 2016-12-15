var path = require('path');
var webpack = require('webpack');

module.exports = {
  // Maps transpiled code to written code when errors happen in the browser for
  // easier debugging
  devtool: 'cheap-module-eval-source-map',
  // This is what goes INTO Webpack
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index' // entry point for our code! <------------------------------<<
  ],
  // This is where it comes out
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  // Plugins help us with hot reloading and error handling
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  // All the loaders!
  //
  // This is where the MAGIC happens!
  //
  // Here we link file types to handlers:
  //   - JS files go through Babel to make our fancy code readable by the
  //     browser.
  //   - Static files go through URL and file loaders
  //   - SASS files go through a chain of SASS -> CSS -> Style loaders
  //   - JSON goes through a JSON loader
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),                        // include these
        exclude: [/(node_modules|bower_components)/, /\.test\.js$/], // ignore these
        query: {
          presets: ['es2015', 'stage-0'],                            // babel presets
        }
      },
      { test: /\.woff2?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg|png|gif|mp3)$/, loader: "file-loader" },
      { test: /\.(sass|scss)$/, loader: 'style!css!sass'},
      { test: /\.json$/,        loader: "json-loader"}
    ]
  }
};
