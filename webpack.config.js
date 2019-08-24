const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenvWebpack = require('dotenv-webpack');

module.exports = {
	devServer: {
		port: 3000,
		historyApiFallback: true,
		inline: true,
		hot: true,
		contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],
		compress: true,
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['eslint-loader','babel-loader']
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
			inject: 'body'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new dotenvWebpack({
			path: __dirname + '/.env'
		})
	],
	node: {
		fs: 'empty' 
	},
	externals: {
	// global app config object
		config: JSON.stringify({
			apiUrl: 'http://localhost:8000/',
			maintenance: false,
			env: 'dev'
		})
  	}
};