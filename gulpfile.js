'use strict'

var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var pump = require('pump');
var cssFiles = 'public/masterkey-dev/css/*.css';
var jsFiles = 'public/masterkey-dev/js/*.js';
var cssMkFile = 'masterkey-api.css';
var jsMkFile = 'masterkey-api.js';
var jsMkMinFile = 'masterkey-api.min.js';
var cssMkMinFile = 'masterkey-api.min.css';
var localesFiles = 'public/masterkey-dev/i18n/*.js';
var distFolder = 'public/masterkey-dev/dist';
var mkFolder = 'public/masterkey-dev';

gulp.task('styles', function () {
    return gulp.src(cssFiles)
        .pipe(concat(cssMkFile))
        .pipe(myth())
        .pipe(cleanCss({ output: cssMkMinFile }))
        .pipe(gulp.dest(distFolder));
});

gulp.task('scripts', function (cb) {
    pump([
        gulp.src([jsFiles, localesFiles]),
        jshint(),
        jshint.reporter('default'),
        concat(jsMkFile),
        gulp.dest(distFolder),
        uglify(),
        gulp.dest(distFolder)
    ],
        cb
    );
});

gulp.task('bower-copy', function () {
    gulp.src('bower.json')
        .pipe(gulp.dest(mkFolder));
});

gulp.task('watch', function () {
    gulp.watch(jsFiles, 'scripts');
    gulp.watch(cssFiles, 'styles');
    gulp.watch('bower.json', 'bower-copy');
});

gulp.task('default', ['scripts', 'styles', 'bower-copy']);
