var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
//?presets[]=stage-0,presets[]=react,presets[]=es2015
var setExternals= function() {
    /*var cortexConfig = require('./cortex.json');
    var externals={};
    var deps = cortexConfig.dependencies;


    for(var item in deps){
        externals[item] = 'require("' + item + '")';
        console.dir(deps[item]);
    }

    return externals;*/
};

var webpackConfig = {
    entry: {
        'index': [path.join(__dirname, 'src/index.js')]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: './',
        chunkFilename: '[name].[chunkhash].js',
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.vue', '.js', '.jsx', '.es6']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        'css-loader?minimize&-autoprefixer',
                        'postcss-loader',
                        'less-loader'
                    ],
                    fallback: 'vue-style-loader'
                })
                //loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            // 上传原图
            // {
            //     test: /\.(jpe?g|png|gif)$/,
            //     loader: 'file?name=image/[name].[ext]'
            // },
            // 变成base64依赖
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: ['url?limit=5000']
            }
        ]
    },
   // externals:setExternals(),
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            title: '自定义页面',
            filename: 'test.html'
        })
    ],
    devServer: {
        contentBase: './',
        port: 1234,
        disableHostCheck: true,
        overlay: {
            warnings: false,
            errors: true,
        }
    },
};


module.exports = webpackConfig;