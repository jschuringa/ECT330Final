'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

var javascriptFiles = ['./code/resources/angular/constructorAndViews.js','./code/resources/angular/**/*.js'];

gulp.task('concat',function(){
    gulp.src(javascriptFiles)
        .pipe(concat('snow.min.js'))
        .pipe(gulp.dest('./code/'));
});

gulp.task('watch', function () {
    gulp.watch(javascriptFiles, ['concat']);
});

gulp.task('uglify',function(){
    gulp.src(javascriptFiles)
        .pipe(uglify('snow.min.js'))
        .pipe(gulp.dest('./code/'));
});

gulp.task('default',['concat','watch']);
gulp.task('compile',['uglify']);