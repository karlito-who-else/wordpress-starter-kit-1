'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import jsonlint  from 'gulp-jsonlint';
import plumber from 'gulp-plumber';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.locales;

gulp.task('locales', () => {
  return gulp.src(sourceFiles, {
    dot: true
  })
  .pipe(plumber({
    errorHandler: reportError
  }))
  .pipe(debug({
    title: 'locales:'
  }))
  .pipe(jsonlint())
  .pipe(jsonlint.reporter(reportError))
  .pipe(plumber.stop())
  .pipe(gulp.dest(config.path.destination.locales))
  .on('error', reportError);
});

gulp.task('locales:watch', function() {
  gulp.watch(sourceFiles, ['locales']);
});
