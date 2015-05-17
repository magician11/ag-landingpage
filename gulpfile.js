// get gulp and the plugins we need for it
var gulp = require('gulp');
var scss = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var webserver = require('gulp-webserver');

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

// watch our scss files for changes
gulp.task('watch', function() {
    gulp.watch('styles/**/*.scss', ['scss']);
});

// run our tasks on running 'gulp' from the command line
gulp.task('default', ['webserver', 'scss', 'watch']);