var gulp = require('gulp');
var uglify = require('gulp-uglify');
//var uglify = require('uglifyjs-webpack-plugin');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

gulp.task('default', function(){
    return console.log('gulp is running');
});

gulp.task('scripts', function(){
   return gulp.src('serverBuild/**/**/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/'));
});
gulp.task('movefolder', function(){
    return gulp.src(['serverBuild/**/**/**/*.js'])
     //.pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
    
});



gulp.task('move',function(){
    return gulp.src([
        'serverBuild'
    ],  {base: './source/'}) 
    .pipe(gulp.dest('./build'));
  });