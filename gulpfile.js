const { watch, src, dest, series, parallel } = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    colors = require("ansi-colors"),
    notifier= require("node-notifier"),
    paths = {
        main: {
            dest: 'dist'
        },
        styles: {
            src: 'src/scss/styles.scss',
            watch: 'src/scss/**/*.scss',
            dest: 'dist/css'
        },
        javascript: {
            src: 'src/js/app.js',
            watch: 'src/js/**/*.js',
            dest: 'dist/js' 
        }
    };

/* ====== DEV PART ============*/
function sassCompile() {
    return (
        src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream())
    );
}

// function sassLintFn() {
//     return (
//         src(paths.styles.watch)
//         .pipe(sassLint())
//         .pipe(sassLint.format())
//         .pipe(sassLint.failOnError())
//     );
// }

 function javascript() {
    return browserify({
        entries: [paths.javascript.src]
    })
    .transform(babelify.configure({
        presets: ['@babel/preset-env']
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(dest(paths.javascript.dest))
    .pipe(browserSync.stream())
}

function showInfo() {
    console.log(colors.green("\n===================================="));
    console.log(colors.green(' REMEMBER IF PROJECT IS LIVE,\n BEFORE COMMIT RUN TASK "gulp build"'));
    console.log(colors.green("====================================\n"));
}


function reload() {
    browserSync.reload();
}

function watchFiles() {
    // browserSync.init({
    //     port: 8080,
    //     proxy: 'http://localhost/nazwa-projektu-wp',
    //     // reloadOnRestart: true,
    // });
    // // Signal completion

    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    
    watch(paths.styles.watch, style);
    watch(paths.javascript.watch, javascript);
    // watch('*.php').on('change', browserSync.reload);
    watch('*.html').on('change', browserSync.reload);

    showInfo()

}

/* ====== PRODUCTION PART ============*/
function cleanUp() {
    return del([paths.main.dest]);
}

function sassMinify() {
    return (
        src(paths.styles.src)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest(paths.styles.dest))
    );
}

 function javascriptMinify() {
    return browserify({
        entries: [paths.javascript.src]
    })
    .transform(babelify.configure({
        presets: ['@babel/preset-env']
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(dest(paths.javascript.dest))
}

// const style = series(sassLintFn, sassCompile);
const style = series(sassCompile);
exports.style = style;
exports.sassCompile = sassCompile;
// exports.sassLintFn = sassLintFn;
exports.javascript = javascript;
exports.watch = watchFiles;

exports.default = watchFiles; // default TASK :)
//USE BEFORE 
exports.build = series(cleanUp, parallel(sassMinify, javascriptMinify));
