'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack');
const path = require('path');
const defaultSettings = require('./default.js');
let config = {
    entry: {
        financing: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://' + defaultSettings.ip + ':' + defaultSettings.port,
            'webpack/hot/only-dev-server',
            './src/financing/financing.js'
        ],
        financeAccount: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://' + defaultSettings.ip + ':' + defaultSettings.port,
            'webpack/hot/only-dev-server',
            './src/financeAccount/financeAccount.js'
        ],
        index: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://' + defaultSettings.ip + ':' + defaultSettings.port,
            'webpack/hot/only-dev-server',
            './src/index.js'
        ]
    },
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
            { test: /\.styl$/, loader: 'style-loader!css-loader?sourceMap!stylus-loader?sourceMap' }, {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.(png|jpg|gif)$/i,
                loader: "file-loader?name=[path][name].[ext]&publicPath=./"
            }
        ]
    },
    devServer: { contentBase: './' },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: false, //注入位置'head','body',true,false
            hash: false,
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'financeAccount.html',
            inject: false, //注入位置'head','body',true,false
            hash: true,
            template: './src/financeAccount/financeAccount.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'financing.html',
            inject: false, //注入位置'head','body',true,false
            hash: false,
            template: './src/financing/financing.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"dev"'
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;
