var gulp = require('gulp'),
  browswerify = require('browserify'),
  reactify = require('reactify'),
  through2 = require('through2'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber');

gulp.task('browswerify', function () {
  gulp
    .src('./src/main.js')
    .pipe(plumber())
    .pipe(through2.obj(function (file, enc, next) {
      browswerify(file.path, {'debug': true})
        .transform('reactify')
        .bundle(function (err, res) {
          file.contents = res;
          next(null, file);
        });
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public'))
});

gulp.task('default', ['browswerify']);

gulp.task('watch', function () {
  gulp.watch('src/**/*.*', ['default']);
});
