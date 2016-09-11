var argv = require('minimist')(process.argv);
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require("webpack");

var is_production = argv.production || process.env.NODE_ENV === 'production';
var root_dir = __dirname + '/..';


var webpack_config = {
  entry: ['babel-polyfill', './app.jsx'],
  output: {
    path: root_dir + '/dist/',
    filename: 'main.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract("style", "css!postcss!stylus?resolve url")
      },
      {
        test: /\.(png|jpg|gif)/,
        loader: 'file?name=i/[hash]-[name].[ext]'
      }

    ]
  },
  babel: {
      presets: [
          "es2015",
          "react"
      ],
      plugins: ["transform-function-bind", "transform-class-properties", "transform-object-rest-spread"]
  },
  postcss: function () {
    return [
        require('postcss-normalize'),
        autoprefixer({ browsers: ['last 2 versions'], remove: false })
    ];
  },
  stylus : {
    include : [
      __dirname + '/stylus/variables',
      __dirname + '/stylus/mixins'
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        'React':          'react',
        'ReactDOM':   'react-dom'
    }),
    new ExtractTextPlugin("main.css",  {
      allChunks: true
    }),
    new CleanWebpackPlugin(['dist'], {
        root: root_dir,
        verbose: true
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV:    JSON.stringify(is_production ? 'production' : ''),
        },
        IS_SERVER: JSON.stringify(false)
    })
  ]
};

if(argv.production) {
  webpack_config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }));
} else {
  webpack_config.devtool = 'eval';
}

module.exports = webpack_config;
