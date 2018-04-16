/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var ip = config.devServer.host;
var port = config.devServer.port;
//const open = require('open');

/**
 * Flag indicating whether webpack compiled for the first time.
 * @type {boolean}
 */
let isInitialCompilation = true;

const compiler = webpack(config);

new WebpackDevServer(compiler, config.devServer)
.listen(port, ip, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Listening at ' + ip +':' + port);
});


compiler.plugin('done', () => {
    if (isInitialCompilation) {
        // Ensures that we log after webpack printed its stats (is there a better way?)
        setTimeout(() => {
            console.log('\n✓ The bundle is now ready for serving!\n');
            console.log('    Open in iframe mode:\t\x1b[33m%s\x1b[0m',    'http://' + ip + ':' + port + '/webpack-dev-server/');
            console.log('    Open in inline mode:\t\x1b[33m%s\x1b[0m', 'http://' + ip + ':' + port + '/\n');
            console.log('    \x1b[33mHMR is active\x1b[0m. The bundle will automatically rebuild and live-update on changes.');
        }, 350);
    }
    isInitialCompilation = false;
});
