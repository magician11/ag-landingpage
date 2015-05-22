// ===============================================================================
// Setup gulp, plugins and global variables
// ===============================================================================

var gulp = require('gulp');
var scss = require('gulp-sass');
var bourbon = require('node-bourbon');
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

// set our paths
var src = 'app';
var assets = 'assets';
var dist = 'dist';
var paths = {
    js: src + '/*.js',
    scss: assets + '/css/*.scss',
    html: src + '/*.html',
    bower: './bower_components'
};

// end: setup gulp, plugins and variables
// ===============================================================================

// ===============================================================================
// Build the app into the dist directory
// ===============================================================================

gulp.task('build-dist', ['vendor', 'scss', 'scripts', 'html']);

// copy across vendor files
gulp.task('vendor', function() {

    // get all minified CSS files
    var vendorCss = [paths.bower + '/bootstrap/dist/css/bootstrap.min.css', paths.bower + '/fontawesome/css/font-awesome.min.css'];
    gulp.src(vendorCss)
        .pipe(gulp.dest(dist + '/css'));

    // get fonts
    gulp.src(paths.bower + '/fontawesome/fonts/*')
        .pipe(gulp.dest(dist + '/fonts'));

    // get all JS
    var vendorJS = [paths.bower + '/angular/angular.min.js', paths.bower + '/angular-animate/angular-animate.min.js'];
    gulp.src(vendorJS)
        .pipe(gulp.dest(dist + '/js'));

});

// setup our Sass compilation task
gulp.task('scss', function() {
    return gulp.src(paths.scss)
        .pipe(scss({
        errLogToConsole: true,
        includePaths: [
            bourbon.includePaths
        ]
    }))
        .pipe(gulp.dest(dist + '/css'));
});

// quality check our JS, minify and copy to dist
gulp.task('scripts', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(dist));
});

// copy across our html files
gulp.task('html', function() {

    return gulp.src(paths.html)
        .pipe(gulp.dest(dist));

});

// end: build app into dist directory
// ===============================================================================

// ===============================================================================
// Setup webserver, watch task and default gulp task
// ===============================================================================

// setup our webserver
gulp.task('webserver', ['build-dist'], function() {
    gulp.src(dist)
        .pipe(webserver({
        livereload: true,
        open: true
    }));
});

// watch our files for changes
gulp.task('watch', function() {
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.html, ['html']);
});

// run our tasks on running 'gulp' from the command line
gulp.task('default', ['build-dist', 'watch', 'webserver']);

// end: setup webserver, watch task and default gulp task
// ===============================================================================