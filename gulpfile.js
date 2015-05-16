/**
 * Plugins
 * -------
 */

var gulp = require('gulp');
var scss = require('gulp-sass');

/**
 * Tasks
 * -----
 */

/**
 * Compiles SCSS files into CSS
 *
 * @source .scss files
 * @dest .css files
 */
gulp.task('scss', function() {
    return gulp.src('styles/ag.scss')
    .pipe(scss({errLogToConsole: true}))
    .pipe(gulp.dest('dist/css'));
});


/**
 * Watch for any scss changes
 */

gulp.task('default', ['scss'], function() {
    gulp.watch('styles/**/*.scss', ['scss']);
});