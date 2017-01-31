var gulp 	     = require('gulp');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var plumber      = require('gulp-plumber');
var nextcss 	 = require('postcss-cssnext');
var nested		 = require('postcss-nested');
var importer	 = require('postcss-import');
var browserSync = require('browser-sync').create();
var fileinclude = require('gulp-file-include');
var imagemin    = require('gulp-imagemin');
var changed     = require('gulp-changed');



gulp.task('serve', ['css'], function() {
  browserSync.init({
    port: 9003,
    server: './dist'
  });


    gulp.watch("src/pre-css/**/*.css", ['css']);
    gulp.watch('src/**/*').on('change', browserSync.reload);
    gulp.watch('./src/**/*.html' , ['include']);

});

gulp.task('css', function () {
    return gulp.src('src/pre-css/style.css')
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( postcss([importer, nested, nextcss]) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('dist/css/') )
        .pipe(browserSync.stream());
});

gulp.task('include',  function() {
  return gulp.src(['./src/**/*.html', '!./src/inc/**/*'])
      .pipe(plumber())
      .pipe(fileinclude({
        prefix: '@@',
        basepath: 'src/'
      }))
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src('./src/img/**/*')
      .pipe(plumber())
      .pipe(changed('./dist/img'))
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/img'))
      .pipe(browserSync.stream());
});


gulp.task('build', ['css',  'serve', 'include', 'images']);
gulp.task('default', ['css', 'build']);