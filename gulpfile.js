/// <binding BeforeBuild='scripts' />
'use strict'

var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var pump = require('pump');
var cssFiles = 'public/masterkey-dev/css/*.css';
var cssMkFile = 'masterkey-api.css';
var jsMkFile = 'masterkey-api.js';
var jsMkMinFile = 'masterkey-api.min.js';
var cssMkMinFile = 'masterkey-api.min.css';
var localesFiles = 'public/masterkey-dev/i18n/*.js';
var distFolder = 'public/masterkey-dev/dist';
var mkFolder = 'public/masterkey-dev';
var jsFiles = [
    "public/masterkey-dev/js/ui-bootstrap-datepicker-tpls-2.1.3.js",
    "public/masterkey-dev/js/masterkey-module.js",
    "public/masterkey-dev/i18n/locale-module.js",
    "public/masterkey-dev/i18n/locale.js",
    "public/masterkey-dev/js/CommandGenerator.js",
    "public/masterkey-dev/js/configurations.js",
    "public/masterkey-dev/js/ConverterService.js",
    "public/masterkey-dev/js/CourseService.js",
    "public/masterkey-dev/js/CourseType.js",
    "public/masterkey-dev/js/CurrencyService.js",
    "public/masterkey-dev/js/DataFile.js",
    "public/masterkey-dev/js/DraftCommand.js",
    "public/masterkey-dev/js/endpointService.js",
    "public/masterkey-dev/js/EventFormatFilter.js",
    "public/masterkey-dev/js/FutureObjectService.js",
    "public/masterkey-dev/js/LineCommand.js",
    "public/masterkey-dev/js/mk-quote-accommodation.js",
    "public/masterkey-dev/js/mk-quote-associated.js",
    "public/masterkey-dev/js/mk-quote-course.js",
    "public/masterkey-dev/js/mk-quote-directive.js",
    "public/masterkey-dev/js/mk-quote-variant.js",
    "public/masterkey-dev/js/mk-search-directive.js",
    "public/masterkey-dev/js/mk-search-filters.js",
    "public/masterkey-dev/js/mk-search-list.js",
    "public/masterkey-dev/js/mk-search-topbar.js",
    "public/masterkey-dev/js/PaginationBackendService.js",
    "public/masterkey-dev/js/Price.js",
    "public/masterkey-dev/js/QuoteService.js",
    "public/masterkey-dev/js/SaleQueryCommand.js"
];

gulp.task('styles', function () {
    return gulp.src(cssFiles)
        .pipe(concat(cssMkFile))
        .pipe(myth())
        .pipe(cleanCss({ output: cssMkMinFile }))
        .pipe(gulp.dest(distFolder));
});

gulp.task('scripts', function (cb) {
    pump([
        gulp.src(jsFiles),
        jshint(),
        jshint.reporter('default'),
        concat(jsMkFile),
//        gulp.dest(distFolder)
        ,uglify()
        ,gulp.dest(distFolder)
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
