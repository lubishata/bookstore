const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './build/src/main.js',
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
    static: './build',
    },
    module: {
        rules: [    
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
    ]
},
resolve: {
    extensions: ['.jsx', '.ts', '.tsx','.js'],
},
plugins:[
    new HtmlWebpackPlugin({
    template: './index.html'
})
]
}