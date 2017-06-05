var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

/* autoprefixer for version browsers */
var autoprefixerLastVersion = "> 1%";
var autoprefixerIEVersion = "IE 8";


//less
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function() {
  return gulp.src('less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
        browsers: [autoprefixerLastVersion, autoprefixerIEVersion],
        cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});


//html
gulp.task('html', function() {
	return gulp.src(['app/*.html', 'app/sites/*.html'])
	.pipe(connect.reload());
})


//wiredep
var wiredep = require('wiredep').stream;

gulp.task('bower', function() {
  gulp.src(['app/index.html', 'app/sites/*.html'])
    .pipe(wiredep({
    	directory : 'app/bower_components/'
    }))
    .pipe(gulp.dest('app/'));
});



/* using the will end */

//clean
var clean = require('gulp-clean');

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});
 
//build 
var useref = require('gulp-useref'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-clean-css');

gulp.task('build', ['clean'], function() {
  return gulp.src(['app/*.html', 'app/sites/*.html'])
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('dist'));
});

//sftp
var sftp = require('gulp-sftp');
 
gulp.task('default', function () {
  return gulp.src('src/*')
    .pipe(sftp({
      host: 'website.com',
      user: 'johndoe',
      pass: '1234',
      remotePath: '/home/...'
    }));
});

//uncss
var uncss = require('gulp-uncss');
 
gulp.task('uncss_bootstrap', function() {
  return gulp.src('bower_components/bootstrap/dist/css/bootstrap.css')
    .pipe(uncss({
        html: ['app/*.html', 'app/sites/*.html']
    }))
    .pipe(autoprefixer({
        browsers: [autoprefixerLastVersion, autoprefixerIEVersion],
        cascade: false
    }))
    .pipe(gulp.dest('app/css/'));
});

/* other plugins */

//connect server
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
});


//watch
gulp.task('watch', function() {
  gulp.watch(['app/*.html'], ['html']);
  gulp.watch(['lib/less/*.less'], ['less']);
  gulp.watch('bower.json', ['bower']);
});

//default
gulp.task('default', ['connect', 'html', 'less', 'bower', 'watch']);
