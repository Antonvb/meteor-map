const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        require('@babel/plugin-proposal-async-generator-functions'),
                        require('@babel/plugin-proposal-class-properties'),
                        require('@babel/plugin-proposal-object-rest-spread')
                    ]
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-maps',
    devServer: {
        contentBase: "./dist"
    }
};