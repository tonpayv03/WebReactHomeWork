module.exports = {
    cacheId: 'WebReact',
    staticFileGlobs: [
        'build/index.html',
        'build/**.json',
        'build/assets/css/**.css',
        'build/assets/images/**.png',
        'build/assets/images/**.ico',
        'build/assets/script/**.js',
        'build/assets/css/**.css',
        'build/static/css/**.css',
        'build/static/js/**.js',
        'build/static/js/**.map',
        'build/static/media/**.woff',
        'build/static/media/**.ttf',
        'build/static/media/**.svg',
        'build/static/media/**.eot',
        'build/static/media/**.jpg',
        'build/static/media/**.png'
    ],
    swFilePath: './build/service-worker.js',
    stripPrefix: 'build/',
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [/^\/product-detail/],
    handleFetch: false,
    skipWaiting: true,
    runtimeCaching: [{
        urlPattern: /(.*)/,
        handler: 'networkFirst',
        method: 'get'
    }]
};