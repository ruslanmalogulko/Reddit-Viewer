const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: './app',
        port: 8080
    },
    entry: path.resolve(__dirname, 'app/base.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: './bundle.js'
    },
    module: {
        loaders: [
          {
              test: /\.css$/,
              include: path.resolve(__dirname, 'app'),
              loader: 'style-loader!css-loader'
          },
          {
            test: /\.scss$/,
            use: [{
              loader: "style-loader"
            }, {
              loader: "css-loader"
            }, {
              loader: "sass-loader",
              options: {
                includePaths: [path.resolve(__dirname, 'app/styles')]
              }
            }]
          },
          {
              test: /\.js[x]?$/,
              include: path.resolve(__dirname, 'app'),
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                  presets: [[
                      'es2015', {}
                  ]]
              }
          }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};
