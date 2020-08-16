const path = require('path');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    entry: {
        notifications: [
            './src/notifications/notifications.js',
            './src/notifications/notifications.scss'
        ],
        main: [
            './src/script.js',
            './src/style.scss'
        ]
    },
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV === 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/index.html',
                    to: './index.html'
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        })
    ],
    devtool: 'eval-source-map',
    devServer: {
        contentBase: 'dist',
        compress: true,
        port: 3000,
        open: true
    },
});