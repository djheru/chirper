var gulp = require('gulp'),
  browserify = require('browserify'),
  reactify = require('reactify'),
  through2 = require('through2'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber');

gulp.task('browserify', function () {
  gulp
    .src('./src/main.js')
    .pipe(plumber())
    .pipe(through2.obj(function (file, enc, next) {
      browserify(file.path, {'debug': true})
        .transform('reactify')
        .bundle(function (err, res) {
          file.contents = res;
          next(null, file);
        });
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public'))
});

gulp.task('default', ['browserify']);

gulp.task('watch', function () {
  gulp.watch('src/**/*.*', ['default']);
});
