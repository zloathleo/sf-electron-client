var path = require('path');
var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    login: './src/scripts/login.js',
    overview: './src/scripts/overview.js',
  },
  //ES6 pack成 ES5
  output: {
    path: path.join(__dirname, 'public'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    filename: 'scripts/[name].js',
  },

  externals: {
    jquery: "jQuery",
    react: "React",
    'react-dom': 'ReactDOM'
  },

  devtool: 'source-map',

  module: {
    rules: [ //加载器   
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },

  //优化webpack打包索引
  resolve: {
    alias: {
      'jquery': path.join(__dirname, '/src/assets/plugins/jquery/jquery-3.2.1.min.js'),
    }
  },

  plugins: [

    new webpack.ProvidePlugin({
      $: 'jquery'
    }),

    //复制资源文件
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),

    //复制html
    new CopyWebpackPlugin([
      {
        from: 'src/html',
        to: 'html'
      }
    ]),

    // new webpack.optimize.UglifyJsPlugin({
    //   //生成环境启用js压缩
    //   // compress: {
    //   //   warnings: false
    //   // }
    //   //开发环境 
    //   compress: false,
    // }),

    new webpack.HotModuleReplacementPlugin() //热加载
  ],
};