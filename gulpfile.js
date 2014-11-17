var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function () {
  gulp.src('src/main.js')
    .pipe(browserify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('newline', function () {
  console.log('\n\n');
});

gulp.task('default', ['browserify', 'watch', 'newline']);

gulp.task('watch', function () {
  gulp.watch('src/**/*.*', ['default'])
});
