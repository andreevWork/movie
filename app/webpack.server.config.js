var webpack = require("webpack");
var fs = require("fs");
var path = require("path");
var root_dir = __dirname + '/..';

module.exports  = {
    entry: './server.jsx',
    output: {
        path: root_dir + '/',
        filename: 'server.js'
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
                loader: 'null'
            }
        ]
    },

    target: 'node',

    // keep node_module paths out of the bundle
    externals: fs.readdirSync(path.resolve(__dirname, '../node_modules')).concat([
        'react-dom/server', 'react/addons',
    ]).reduce(function (ext, mod) {
        ext[mod] = 'commonjs ' + mod;
        return ext
    }, {}),

    node: {
        __filename: true,
        __dirname: true
    },
    babel: {
        presets: [
            "es2015",
            "react"
        ],
        plugins: ["transform-function-bind", "transform-class-properties", "transform-object-rest-spread"]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'React':          'react',
            'ReactDOM':   'react-dom'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:    JSON.stringify('production')
            },
            IS_SERVER: JSON.stringify(true)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
};

