var browserify = require('browserify');
var reactify = require('reactify');
var es6ify = require('es6ify');
var babelify = require('babelify');
var less = require('gulp-less');
var concat = require('gulp-concat');
var gulp = require('gulp');
var path = require('path');
var source = require('vinyl-source-stream');

var jslibs = require('./libs');

gulp.task('less', function () {
    return gulp.src('./public/src/styles/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/dest/styles'));
});

gulp.task('libs', function() {
    return gulp.src(jslibs(true))
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./public/dest/js/'));
});

gulp.task('browserify', function(){
    es6ify.traceurOverrides = {experimental: true};

    browserify('./public/src/js/app.js')
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/dest/js/'));
});

gulp.task('default', ['less', 'libs', 'browserify'], function() {
    return gulp.watch('./public/src/**/*.*', ['less', 'browserify']);
});