'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack');
const path = require('path');
const defaultSettings =  require('./default.js');
let config = {
    entry: {
        index:[
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/index.js'],
        financing:[
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/financing/financing.js'],
        financeAccount:[
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/financeAccount/financeAccount.js']
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath:'dist/'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
            {
                test: /\.(js|jsx)$/,
                use:
                {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                        plugins: ['react-hot-loader/babel']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/i, loader: "file-loader?name=img/[name].[ext]&publicPath=./"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: false, //注入位置'head','body',true,false
            hash: false,
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'financing.html',
            inject: false, //注入位置'head','body',true,false
            hash: true,
            template: './src/financing/financing.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'financeAccount.html',
            inject: false, //注入位置'head','body',true,false
            hash: true,
            template: './src/financeAccount/financeAccount.html'
        })
    ]
}

module.exports = config;
