var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
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
    entry: [
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        //libraryTarget: 'umd',
        path:path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '../'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                //loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.html$/,
                loader: "handlebars-loader"
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
        new ExtractTextPlugin(path.join('css/page.css')),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};


module.exports = webpackConfig;