var path = require('path');
var webpack = require('webpack');

module.exports = {
  // Maps transpiled code to written code when errors happen in the browser for
  // easier debugging [OPTIONAL!]
  devtool: 'source-map',
  // This is what goes INTO Webpack
  entry: [
    './src/index' // entry point for our code! <------------------------------<<
  ],
  // This is where it comes out
  output: {
    path: path.join(__dirname, 'dist', 'static'),
    filename: "bundle.js",
    publicPath: '/static/'
  },
  // Plugins help us with minifying and optimization
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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
