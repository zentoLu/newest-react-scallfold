'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack');
const path = require('path');
const defaultSettings =  require('./default.js');
let config = {
    /*entry: {
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
    },*/
    entry:{
    financeAccount: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:9000',
        'webpack/hot/only-dev-server',
        './src/financeAccount/financeAccount.js'
    ] },
    /*entry: {index: [
                'react-hot-loader/patch',
                'webpack-dev-server/client?http://localhost:9000',
                'webpack/hot/only-dev-server',
                './src/index.js']},*/
    /*entry:{
    financeAccount: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:9000',
        'webpack/hot/only-dev-server',
        './src/financeAccount/financeAccount.js'
    ] },*/

    //mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    devtool: 'eval-source-map',
    cache: true,
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/i, loader: "file-loader?name=img/[name].[ext]&publicPath=./"
            }
        ]
    },
    devServer: { contentBase: './'},
    plugins: [
        /*new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: false, //注入位置'head','body',true,false
            hash: false,
            template: './src/index.html'
        }),*/
        new HtmlWebpackPlugin({
            filename: 'financeAccount.html',
            inject: false, //注入位置'head','body',true,false
            hash: true,
            template: './src/financeAccount/financeAccount.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;
