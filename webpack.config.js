var path = require('path');

module.exports = {
  entry: "./src/app.js",
  output: {
    path: __dirname + "/dist",
    filename: "app.js"
  },
	node: {
		fs: 'empty'
	},
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/, /dist/]
      }
    ],
    loaders: [
      {
				test: /\.json$/,
				include: path.join(__dirname, 'node_modules', 'pixi.js'),
				loader: 'json'
			},
      {
        test: /\.json$/,
        include: path.join(__dirname, 'node_modules', 'p2'),
        loader: 'json'
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /dist/],
        loader: "style!css"
      },
      {
        test: /\.js?$/,
        exclude: [/node_modules/, /dist/],
        loader: 'babel'
      }
    ]
  }
};
