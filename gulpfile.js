// get gulp and the plugins we need for it
var gulp = require('gulp');
var scss = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');

// setup our Sass compilation task
gulp.task('scss', function() {
    return gulp.src('styles/ag.scss')
        .pipe(scss({
        errLogToConsole: true,
        includePaths: ['styles'].concat(bourbon)
    }))
        .pipe(gulp.dest('dist/css'));
});

// setup our webserver
gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
        livereload: true,
        open: true
    }));
});

// quality check our JS
gulp.task('lint', function() {
    return gulp.src('scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// watch our scss files for changes
gulp.task('watch', function() {
    gulp.watch('styles/**/*.scss', ['scss']);
    gulp.watch('scripts/*.js', ['lint']);
});

// run our tasks on running 'gulp' from the command line
gulp.task('default', ['webserver', 'watch']);