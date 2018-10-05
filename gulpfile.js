var gulp = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    plugins = require('gulp-load-plugins')({
        camelize: true
    });

// configuracion gulpfile.js
global.GULP_CONFIG = require('./gulpconfig');

// Borrar directorio destino ( inicio proyecto )
function clean() {
    return del(GULP_CONFIG.destino, {
        force: true
    });
}

// ### styles
function styles() {
    return gulp.src(GULP_CONFIG.styles.origen)
        .pipe(plugins.sourcemaps.write({
            includeContent: false
        }))
        .pipe(plugins.sourcemaps.init({
            loadMaps: true
        }))
        .pipe(plugins.sass(GULP_CONFIG.styles.libsass).on('error', plugins.sass.logError))
        .pipe(plugins.cssnano(GULP_CONFIG.styles.cssnano))
        // .pipe(plugins.concat(GULP_CONFIG.styles.concat))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(GULP_CONFIG.styles.destino))
        .pipe(browserSync.stream());
}

// ### html
function htmls() {
    return gulp.src(GULP_CONFIG.htmls.origen)
        .pipe(plugins.changed(GULP_CONFIG.htmls.destino))
        .pipe(gulp.dest(GULP_CONFIG.htmls.destino));
}

// ### scripts js 
function scriptsjs() {
    return gulp.src(GULP_CONFIG.scriptsjs.origen)
        .pipe(plugins.uglify(GULP_CONFIG.scriptsjs.uglify))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat(GULP_CONFIG.scriptsjs.concat))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(GULP_CONFIG.scriptsjs.destino));
}

// ### watch
function watch() {
    browserSync.init(GULP_CONFIG.browsersync);
    gulp.watch(GULP_CONFIG.styles.origen, styles);
    gulp.watch(GULP_CONFIG.htmls.origen, htmls).on('change', browserSync.reload);
    gulp.watch(GULP_CONFIG.scriptsjs.origen, scriptsjs);
}

var construccion = gulp.series(clean, gulp.parallel(htmls, styles, scriptsjs), watch);

gulp.task('default', construccion);