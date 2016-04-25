'use strict';

const gulp = require('gulp'),
      gutil = require('gulp-util'),
      connect = require('gulp-connect'),
      pug = require('gulp-pug'),
      plumber = require('gulp-plumber'),
      rename = require('gulp-rename');

gulp.task('connect', () => {
    connect.server({
        livereload: true,
        port: 3000
    });
});

gulp.task('pug', () => {
    gulp.src('./pug/main.pug')
        .pipe( plumber() )
        .pipe( pug({ doctype: 'html' }) )
        .pipe( rename('index.html') )
        .pipe( gulp.dest('./') )
        .pipe( connect.reload() );
});

gulp.task('watch', () => {
    gulp.watch('**/*.*', ['pug']);
});

gulp.task('default', ['pug', 'connect', 'watch']);
