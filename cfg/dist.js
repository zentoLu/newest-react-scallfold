'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
let config = {
    entry: {
        index: ['./src/index.js'],
        financing: ['./src/financing/financing.js'],
        financeAccount: ['./src/financeAccount/financeAccount.js']
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: 'dist/'
    },
    devtool: 'eval',
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }, {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                    }
                },
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif)$/i,
                loader: "file-loader?name=img/[name].[ext]&publicPath=./"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: false, //注入位置'head','body',true,false
            hash: true,
            template: './src/index.html'
        }),
        new UglifyJSPlugin(),
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
        })
    ]
}

module.exports = config;
