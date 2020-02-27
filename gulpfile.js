const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
// const imagemin = require('gulp-imagemin');

const jsFiles = [
   './src/js/main.js'
]

//Таск для обработки стилей
gulp.task('styles', () => {
   return gulp.src('./src/sass/**/style.sass')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
         overrideBrowserslist:  ['last 2 versions'],
         cascade: false
         }))
      .pipe(cleanCSS({
         level: 2
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.stream());  
});

//Таск для обработки скриптов
gulp.task('scripts', () => {
   return gulp.src(jsFiles)
   .pipe(concat('scripts.js'))
   .pipe(uglify({
      toplevel: true
   }))
   .pipe(gulp.dest('./build/js'))
   .pipe(browserSync.stream());
});

//Таск для очистки папки build
gulp.task('del', () => {
   return del(['build/*'])
});

//Таск для сжатия изображений
// gulp.task('img-compress', ()=> {
//    return gulp.src('./src/img/**')
//    .pipe(imagemin({
//       progressive: true
//    }))
//    .pipe(gulp.dest('./build/img/'))
// });

//Таск для отслеживания изменений в файлах
gulp.task('watch', () => {
   browserSync.init({
      //  proxy: "name"
      server: {
         baseDir: "./"
      }
   });
   // gulp.watch('./src/img/**', gulp.series('img-compress'))
   gulp.watch('./src/sass/**/*.sass', gulp.series('styles'))
   gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
   gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts'), 'watch'));










