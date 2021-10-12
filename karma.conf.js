const pkg = require('./package.json');

module.exports = function (config) {
    config.set({
        browserDisconnectTimeout: 100000,
        browserNoActivityTimeout: 100000,
        browserDisconnectTolerance: 12,
        frameworks: ['mocha', 'expect'],
        basePath: '.',
        client: {
            mocha: {
                timeout : 12000
            }
        },
        files: [
            'node_modules/@maptalks/gltf-loader/gltf-loader.js',
            pkg.main,
            'test/**/*.js',
            {
                pattern: 'test/models/**/*',
                included: false
            },
            {
                pattern: 'test/images/**/*',
                included: false
            },
            {
                pattern: 'test/resources/**/*',
                included: false
            }
        ],
        proxies: {
            '/models/': '/base/test/models/',
            '/images/': '/base/test/images/',
            '/resources/': '/base/test/resources/'
        },
        preprocessors: {
        },
        browsers: ['Chrome'],
        reporters: ['mocha']
    });
};
