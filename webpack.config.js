var path = require('path');
var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var config = {
	context: path.join(__dirname, 'src'), // исходная директория
	entry: './index', // файл для сборки, если несколько - указываем hash (entry name => filename)
	output: {
		path: path.join(__dirname, 'public/assets') // выходная директория
	},
  plugins: [
  		new BowerWebpackPlugin({
  			modulesDirectories: ['bower_components'],
  			manifestFiles: ['bower.json', '.bower.json'],
  			includes: /.*/,
  			excludes: /.*\.less$/
  		})],


};
var compiler = webpack(config);
compiler.run(function (err, stats) {
	console.log(stats.toJson()); // по завершению, выводим всю статистику
});
