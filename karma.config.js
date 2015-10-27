var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    reporters: ['dots'],
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    autoWatchBatchDelay: 300,

    files: [
      //'lolball.js',
      //'./node_modules/angular-mocks/angular-mocks.js',
      'src/test/**/*.js'
    ],

    preprocessors: {
      // 'lolball.js': ['webpack'],
      'src/test/**/*.js': ['webpack', 'sourcemap']
    },

    // babelPreprocessor: {
    //   options: {
    //     presets: ['es2015'],
    //     sourceMap: 'inline'
    //   },
    //   filename: function (file) {
    //     return file.originalPath.replace(/\.js$/, '.es5.js');
    //   },
    //   sourceFileName: function (file) {
    //     return file.originalPath;
    //   }
    // },

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
}
