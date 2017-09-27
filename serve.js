'use strict';

var browserSync = require('browser-sync');

browserSync.init({
    serveStatic: ['.'],
    proxy: '101.226.6.177:8089',
    open: 'local',
    startPath: '/haikou/首页.html',
    ghostMode: false,
    notify: false
});
