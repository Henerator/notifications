const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-inline-loader',
                    options: {
                        removeSVGTagAttrs: false
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};