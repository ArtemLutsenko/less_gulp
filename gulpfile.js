var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var browerSync = require('browser-sync').create();

var config = {
    paths: {
        less: './src/less/*.less',
        html: './public/index.html'
    },
    output: {
        cssName: 'bundle.min.css',
        path: './public'
    }
};

gulp.task('less', function() {
    return gulp.src(config.paths.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        //.pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browerSync.stream());
});

gulp.task('serve', function() {
    browerSync.init({
        server: {
            baseDir: config.output.path
        }
    });

    gulp.watch(config.paths.less, ['less']);
    gulp.watch(config.paths.html).on('change', browerSync.reload);
});

gulp.task('less', function(done) {
    gulp.src(config.paths.less)
      .pipe(less().on('error', function(error) {
        // у нас ошибка
        done(error);
      }))
      .pipe(gulp.dest(config.output.path))
      .on('end', function() {
        // у нас все закончилось успешно
        done();
      });
  });


gulp.task('default', ['less', 'serve']);