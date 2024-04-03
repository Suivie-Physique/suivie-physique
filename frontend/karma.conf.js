module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmine: {
      random: false // disables test randomization, for deterministic test order
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular-app'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customeLaunchers: {
     	ChromeHeadlessNoSandbox: {
	  base: 'ChromeHeadless',
          flags: ['--no-sandbox']			
	}
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
