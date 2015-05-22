// get gulp and the plugins we need for it
var gulp = require('gulp');
var scss = require('gulp-sass');
var bourbon = require('node-bourbon');
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');

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

// copy across vendor files
gulp.task('vendor', function() {

    // get all minified CSS files
    var vendorCss = [paths.bower + '/bootstrap/dist/css/bootstrap.min.css', paths.bower + '/fontawesome/css/font-awesome.min.css'];
    gulp.src(vendorCss)
        .pipe(gulp.dest(dist + '/css'));

    // get fonts
    gulp.src(paths.bower + '/fontawesome/fonts/*')
        .pipe(gulp.dest(dist + '/fonts'));

    // TODO: get all JS
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

// copy across our html files
gulp.task('html', function() {

    return gulp.src(paths.html)
        .pipe(gulp.dest(dist));

});

// setup our webserver
gulp.task('webserver', function() {
    gulp.src(dist)
        .pipe(webserver({
        livereload: true,
        open: true
    }));
});

// quality check our JS and copy to dist
gulp.task('scripts', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(dist));
});

// watch our files for changes
gulp.task('watch', function() {
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.html, ['html']);
});

// run our tasks on running 'gulp' from the command line
gulp.task('default', ['webserver', 'scss', 'scripts', 'html', 'vendor', 'watch']);