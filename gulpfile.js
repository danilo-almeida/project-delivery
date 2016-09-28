// Include gulp
var gulp = require('gulp'),
    livereload = require('gulp-livereload');

// Include plugins
var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util');

var basePaths = {
    src: 'src/',
    dist: 'build/',
    bower: 'src/components/',
    app: 'app/'
};

var paths = {
    images: {
        src: basePaths.src + 'imgs/',
        dist: basePaths.dist + 'imgs/'
    },
    scripts: {
        src: basePaths.src + 'js/',
        app: basePaths.app,
        dist: basePaths.dist + 'js/'
    },
    styles: {
        src: basePaths.src + 'sass/',
        dist: basePaths.dist + 'css/'
    },
    sprite: {
        src: basePaths.src + 'sprite/*'
    },
    fonts: {
        src: basePaths.src + 'fonts/',
        dist: basePaths.dist + 'fonts/'
    },
    html: {
        src: basePaths.src + 'fonts/',
        dist: basePaths.dist + 'fonts/'
    }
};

// Concatenate & Minify JS
var include = require('gulp-include');
gulp.task('scripts', function () {
    return gulp.src(paths.scripts.app + 'app.loader.js')
        .pipe(include())
        .pipe(rename('app.js'))
        .pipe(gulp.dest(paths.scripts.dist));
});

// Watch for changes in files
gulp.task('watch', function () {
    livereload.listen();
    // Watch .js files
    gulp.watch([paths.scripts.app + "**/*.js", paths.scripts.src + "*.js"], ['scripts']).on('change', livereload.changed);
    gulp.watch(paths.scripts.dist + "*.js").on('change', livereload.changed);

    // Watch .scss files
    gulp.watch([paths.styles.src + "**/*"], ['compass']);
    gulp.watch(paths.styles.dist + '*.css').on('change', livereload.changed);

    // Watch image files
    gulp.watch([paths.images.src + "**/*"], ['images']);

    //Watch HTML
    gulp.watch([basePaths.app + "**/*.html", "*.html"], ['minify-html']);
    gulp.watch(['build/**/*.html']).on('change', livereload.changed);
});

// Compile SASS to CSS
var compass = require('gulp-compass'),
    cssmin = require('gulp-cssmin');

gulp.task('compass', function () {
    gulp.src(paths.styles.src + "/main.scss")
        .pipe(compass({
            css: paths.styles.dist,
            sass: paths.styles.src,
            image: paths.images.dist,
            font: paths.fonts.dist,
            import_path: basePaths.bower,
            style: 'compressed', // :expanded or :nested or :compact or :compressed
            require: ['susy', 'breakpoint', 'ceaser-easing'],
            line_comments: false,
            sourcemap: true,
            relative_assets: true
        }))

        .on('error', function (error) {
            console.log(error);
            this.emit('end');
        })
        .pipe(gulp.dest(paths.styles.dist))
});


//Image minify and optimization
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');

gulp.task('images', function () {
    return gulp.src(paths.images.src + "**/*")
        .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
        .pipe(gulp.dest(paths.images.dist));
});

// Jasmine
var jasmine = require('gulp-jasmine');

gulp.task('default', function () {
    return gulp.src('spec/test.js')
        .pipe(jasmine());
});

// HTML
var minifyHTML = require('gulp-minify-html');
gulp.task('minify-html', function () {
    var opts = {
        conditionals: true,
        spare: true
    };
    return gulp.src(['./app/**/*.html', './index.html'])
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./build/'));
});

// Servidor
var connect = require('gulp-connect');
gulp.task('server', function () {
    connect.server({
        port: 8070,
        root: 'build',
        livereload: true
    });
});

// Default Task
gulp.task('default', ['images', 'minify-html', 'scripts', 'compass', 'watch', 'server']);
gulp.task('prod', ['scripts', 'compass', 'images', 'watch']);