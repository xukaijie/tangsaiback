var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽取CSS文件插件
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {


    entry: {
        pages: __dirname +'/app/index.jsx',
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: __dirname+'/dist',
        filename: 'bundle.js',
        publicPath:"/dist/",
        chunkFilename: '[name].[chunkhash:5].chunk.js'
    },

    module: {
        loaders: [
            { test: /\.css$/,exclude:/node_modules/,loader: "style-loader!css-loader?modules&localIdentName=[name]__[local]-[hash::5]"},
            { test: /\.css$/,include: [path.resolve(__dirname, "node_modules/react-date-picker")],loader: "style-loader!css-loader"},
            { test: /\.less$/,loader: 'style-loader!css-loader' },
            { test: /\.js[x]$/,exclude:/node_modules/,loader: 'babel-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=6400&name=images/[hash:8].[name].[ext]' },
            { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url' }
        ]

    },
    resolve: {
        extensions: ['.','.js', '.jsx'],
        alias:{
            pubComp:path.resolve(__dirname,"app/components/public"),
            cmPath:path.resolve(__dirname,"app/common"),
            actionPath:path.resolve(__dirname,"app/redux/action"),
            imgPath:path.resolve(__dirname,"app/img"),
        }
    },

    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity,
            filename: 'common.js'
        }),
        new webpack.ProvidePlugin({$:'jquery'}),
        new webpack.DefinePlugin({
            "process.env": {
                HOST: JSON.stringify("https://api-stage.beichoo.com"),
                HOST_B:JSON.stringify("https://stage.beichoo.com"),
                NODE_ENV:JSON.stringify("production"),
                H5HOST:JSON.stringify("https://promotion-stage.beichoo.com")
            }
        }),

        new HtmlWebpackPlugin({
            filename: '../index.html', /*相对于path目录*/
            template: './template/index.html',
            hash: true,
        }),

        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        })
    ]
};
