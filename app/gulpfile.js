var browserify = require('browserify');
var reactify = require('reactify');
var es6ify = require('es6ify');
var babelify = require('babelify');
var less = require('gulp-less');
var concat = require('gulp-concat');
var gulp = require('gulp');
var path = require('path');
var source = require('vinyl-source-stream');

gulp.task('less', function () {
    return gulp.src('./public/src/styles/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/dest/styles'));
});

gulp.task('browserify', function(){
    es6ify.traceurOverrides = {experimental: true};

    browserify('./public/src/js/app.js')
        .transform(babelify)
        .transform(es6ify.configure(/.jsx/))
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/dest/js/'));
});

gulp.task('default', ['less', 'browserify'], function() {
    return gulp.watch('./public/src/**/*.*', ['less', 'browserify']);
});