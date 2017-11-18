module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel-loader'],
        }]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
    };