const defaultSettings =  require('./cfg/default.js');
var bodyParser = require('webpack-body-parser');
const path = require('path');
const webpack = require('webpack');

const args = require('minimist')(process.argv.slice(2));
let env = args.env || 'dev';
let envConfig = require(path.join(__dirname, 'cfg/' + env));

module.exports = {
    entry: envConfig.entry,
    mode: env !== 'dist' ? 'development' : 'production',
    output: envConfig.output,
    /*output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath:'dist/'
    },*/
    /*output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },*/
    module: envConfig.module,
    devtool: envConfig.devtool,
    devServer: {
        before: function(app) {
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());
        },
        proxy: [{
            context: ["/user/", "/front/", "/cust/"],
            target: {host: defaultSettings.ip || '172.20.10.105', protocol: 'http:', port: 80},
            //target: {host: '172.20.10.105', protocol: 'http:', port: 80},
            secure: false,
            ingorePath: false,
            changeOrigin: true,
            onProxyReq(proxyReq, req, res) {
                if ( req.method == "POST" && req.body ) {
                    let body = req.body;

                    // URI encode JSON object
                    body = Object.keys( body ).map(function( key ) {
                        var value = body[ key ];
                        if(typeof value === 'object' && value !== null) {
                            value = JSON.stringify(value);
                        }else{
                            value = encodeURI( body[ key ])
                        }
                        return encodeURI( key ) + '=' + value
                    }).join('&');
                    console.log(body);
                    // Update header
                    proxyReq.setHeader( 'content-type', 'application/x-www-form-urlencoded' );
                    proxyReq.setHeader( 'content-length', body.length );

                    // Write out body changes to the proxyReq stream
                    proxyReq.write( body );
                    proxyReq.end();
                }
            },
            pathRewrite:function(path, req) {
                console.log('\n-------------------------------');
                console.log(req.body,path);
                return path;
            }

        }],
        host: defaultSettings.ip,
        contentBase: env === 'test' ? envConfig.devServer.contentBase : './',
        historyApiFallback: false,
        compress: true,
        hot: true,
        inline: true,
        port: defaultSettings.port
    },
    resolve: {
        extensions: ['.js', '.jsx', '.styl'],
        alias: {
            globalComponents: `${defaultSettings.srcPath}/globalComponents/`,
            sources: `${defaultSettings.srcPath}/sources/`,
            stores: `${defaultSettings.srcPath}/stores/`,
            styles: `${defaultSettings.srcPath}/styles/`,
            config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
            request: `${defaultSettings.srcPath}/util/request`,
            tool: `${defaultSettings.srcPath}/util/tool`,
            projectTool: `${defaultSettings.srcPath}/util/projectTool`,
            form: `${defaultSettings.srcPath}/globalComponents/form`,
            'react/lib/ReactMount': 'react-dom/lib/ReactMount'
        }
    },
    plugins: envConfig.plugins
};
