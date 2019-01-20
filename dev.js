process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'main';

require('@babel/register')({
  root: __dirname,
  only: [__dirname],
  ignore: [/node_modules/]
});
require('@babel/polyfill');

require('electron-debug')({showDevTools: true});

require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer');
  installExtension
    .default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err);
    });
});

require('./app/src/main');
