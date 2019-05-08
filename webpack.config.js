/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-08 10:55:26
 * @LastEditTime: 2019-05-08 18:50:58
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'bundle.[hash:4].js',
    path:path.resolve(__dirname,'dist')
  },

  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader?cacheDirectory=true',
        },
        exclude: /(node_modules|bower_components)/,
        include:'/src/'
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      hash:true
    }), //html模板
    new webpack.HotModuleReplacementPlugin(), //热更新
    new webpack.ProvidePlugin({
      _utils:[path.resolve(path.join(__dirname, 'src/utils/global.js')),'default']
    }), //定义全局变量   不用单独 import require

    new CleanWebpackPlugin(),

    new CopyPlugin([
      // {from:'./src/utils',to:path.resolve(__dirname,'dist/utils')},  
      // {from:'./src/utils',to:path.resolve(__dirname,'dist/utils2')},
    ])//目录移动
  ],
  devServer:{ //本地服务
    host:'localhost',
    port:8085,
    open:true,
    hot:true
  },
  resolve: {  //解析
    extensions:['.js','.json','.css','.scss'] //省略后缀
  }
  // mode:'production'
}