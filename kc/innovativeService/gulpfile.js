'use strict';

// Require
const gulp = require('gulp');    //载入gulp
const watch = require('gulp-watch');
const changed = require('gulp-change');
const gulpLess = require('gulp-less');   //将less预处理为css
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');  //防止编译出错即停止
var newer = require('gulp-newer');
var postcss      = require('gulp-postcss');

var autoprefixer = require('autoprefixer');
gulp.task('less', function () {  //定义名为less的任务
    return gulp.src('src/less/*.less')
        // .pipe(changed('src/less', {extension: '.css'}))
        // .pipe(newer('../../dist', {ext: '.css'}))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(gulpLess())    //将less预处理为css
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write(null, {includeContent: true, sourceRoot: '.'}))
        .pipe(gulp.dest('src/less'));  //最后生成的文件路径为src/css/*.less
});

// gulp.task('watch', function () {  //定义名为watchless的任务
//     gulp.watch('src/less/*.less', ['less']);   //监听该目录下less文件的变化
// });
gulp.task('watch', function () {  //定义名为watchless的任务
    return watch('src/less/*.less', {ignoreInitial: false})
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(gulpLess())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write(null, {includeContent: true, sourceRoot: '.'}))
        .pipe(gulp.dest('src/less'));
});



