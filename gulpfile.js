'use strict';

// Require
var gulp = require('gulp');    //载入gulp



var browserSync = require('browser-sync');


gulp.task('serve', function () {
    // var index = serveIndex('.', {'icons': true});
    browserSync.init({
        serveStatic: ['.'],
        // serveStaticOptions: {
        //     route: '/kc',
        //     // fallthrough:false,
        //     index: false,
        //     redirect: '/kc',
        // },

        // serveStatic: [{
        //     route: '/kc',
        //     dir: ['.'],
        //     fallthrough:false,
        //     index:'asdfasdfasaf.html',
        //     redirect:false,
        //
        // }],

        // middleware: [
        //     {
        //         route: "/kc",
        //         handle: function (req, res, next) {
        //             var done = finalhandler(req, res);
        //             // next();
        //             return index(req, res, done);
        //             /** First middleware handler **/
        //
        //         }
        //     }
        // ],


        files:
            [],
        proxy:
            '101.226.6.177:8089',
        open:
            'local',
        startPath:
            "/haikou/首页.html",
        ghostMode:
            false
    });

});
