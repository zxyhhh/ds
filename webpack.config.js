
var webpack=require('webpack')
// import webpack from 'webpack';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量  标志是线上还是生产环境
var WEBPACK_ENV=process.env.WEBPACK_ENV ||'dev';

//实现插件htmlwebpackPlugin的功能
var getHtmlConfig=function(name,title){
	return {
		    template:'./src/view/'+name+'.html',
			filename:'view/'+name+'.html',//以output的path为相对地址
			title:title,
			inject:true,
			hash:true,
			chunks:['common',name]
	}

}
 
var config={
	entry:{
		'common':['./src/page/common/index.js'],
		'index':['./src/page/index/index.js'],
		'login':['./src/page/login/index.js'],
		'result':['./src/page/result/index.js']
	},
	output:{
		path:'./dist',
		publicPath:'/dist',//保证编译出来的文件地址
		filename:'js/[name].js'
	},
	external:{
		'jquery':'window.jQuery'
	},
	module:{
		loaders:[
		    { test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
		    { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
		    { test:/\.string$/,loader:"html-loader"}
		]
	},
	resolve:{
		alias:{
			util:__dirname+'/src/util',
			page:__dirname+'/src/page',
			service:__dirname+'/src/service',
			image:__dirname+'/src/image',
			node_modules:__dirname+'/node_modules'
		}

	},
	plugins:[
	    //独立通用模块到j/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name: "common",
			filename: "js/base.js"
		}),
		//把css单独打包到文件中
		new ExtractTextPlugin("css/[name].css"),
		//html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebpackPlugin(getHtmlConfig('login','登录')),
		new HtmlWebpackPlugin(getHtmlConfig('result','结果'))
	]
};
//判断环境变量

if('dev'===WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');

}
module.exports=config;