var browserify = require('browserify');
var less = require('gulp-less');
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

gulp.task('browserify', function() {
    return browserify('./public/src/js/index.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/dest/js'));
});

gulp.task('dev', ['less', 'browserify']);