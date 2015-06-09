
// ===============================================================================
// Setup gulp, plugins and global variables
// ===============================================================================

var gulp = require('gulp');
var scss = require('gulp-sass');
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefix = require('gulp-autoprefixer');
var clean = require('del');
var htmlhint = require('gulp-htmlhint');
var htmlmin = require('gulp-htmlmin');

// end: setup gulp, plugins and variables
// ===============================================================================

// ========================================
// Location of app directories and files
// ========================================

// directories
var appDirectory = {
    src: 'app',
    assets: 'assets',
    dist: 'dist',
    npmDir: 'node_modules'
};

// files
var appFiles = {
    js: appDirectory.src + '/**/*.js',
    scss: [appDirectory.assets + '/css/*.scss'],
    html: [appDirectory.src + '/**/*.html', appDirectory.assets + '/egg/*.html'],
    vendorCSS: [appDirectory.npmDir + '/foundation-sites/css/foundation.min.css', appDirectory.npmDir + '/font-awesome/css/font-awesome.min.css',
                appDirectory.assets + '/egg/*.css'],
    fontAwesome: appDirectory.npmDir + '/font-awesome/fonts/*',
    vendorJS: [appDirectory.npmDir + '/angular/angular.min.js', appDirectory.npmDir + '/angular-animate/angular-animate.min.js',
               appDirectory.assets + '/**/*.js', appDirectory.npmDir + '/angular-route/angular-route.min.js',
               appDirectory.npmDir + '/angular-touch/angular-touch.min.js']
};

// end: location of directories and files
// ===============================================================================

// ===============================================================================
// Build the app into the dist directory
// ===============================================================================

gulp.task('build-dist', ['vendor', 'scss', 'scripts', 'html']);

// copy across vendor files
gulp.task('vendor', function() {

    // get all minified CSS files
    gulp.src(appFiles.vendorCSS)
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest(appDirectory.dist + '/css'));

    // get fonts
    gulp.src(appFiles.fontAwesome)
        .pipe(gulp.dest(appDirectory.dist + '/fonts'));

    // get all JS
    gulp.src(appFiles.vendorJS)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(appDirectory.dist + '/js'));

});

// process our Sass and CSS
gulp.task('scss', function() {
    return gulp.src(appFiles.scss)
        .pipe(scss({
        errLogToConsole: true
    }))
        .pipe(autoprefix())
        .pipe(minifyCSS())
        .pipe(concat('ag.min.css'))
        .pipe(gulp.dest(appDirectory.dist + '/css'));
});

// quality check our JS, minify and copy to dist
gulp.task('scripts', function() {
    return gulp.src(appFiles.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('ag.min.js'))
        .pipe(gulp.dest(appDirectory.dist + '/js'));
});

// copy across our html files
gulp.task('html', function() {

    // check our index.html for everything
    gulp.src(appDirectory.src + '/index.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());

    // check all our html files (less the index) for valid HTML only
    gulp.src(appFiles.html.concat('!' + appDirectory.src + '/index.html'))
        .pipe(htmlhint({
        "doctype-first": false
    }))
        .pipe(htmlhint.reporter());

    // now copy all the html files to our dist directory
    return gulp.src(appFiles.html)
        .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
        .pipe(gulp.dest(appDirectory.dist));
});

// end: build app into dist directory
// ===============================================================================

// ===============================================================================
// Setup webserver, watch task, clean task and default gulp task
// ===============================================================================

// setup our webserver
gulp.task('webserver', ['build-dist'], function() {
    gulp.src(appDirectory.dist)
        .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('clean', function(cb) {
    clean([appDirectory.dist]);
});

// watch our files for changes
gulp.task('watch', function() {
    gulp.watch(appFiles.scss, ['scss']);
    gulp.watch(appFiles.js, ['scripts']);
    gulp.watch(appFiles.html, ['html']);
});

// run our tasks on running 'gulp' from the command line
gulp.task('default', ['build-dist', 'watch', 'webserver']);

// end: setup webserver, watch task and default gulp task
// ===============================================================================