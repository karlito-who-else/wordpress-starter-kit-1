'use strict';

import debug from 'gulp-debug';
import fs from 'fs';
import gulp from 'gulp';
import GulpSSH from 'gulp-ssh';
import plumber from 'gulp-plumber';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

const privateKey = fs.readFileSync(config.connection.staging.privateKey);

const connection = {
  host: config.connection.staging.host,
  port: config.connection.staging.port,
  privateKey: privateKey,
  user: config.connection.staging.user
};

const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
});

let sourceFiles = [config.path.destination.base + '/**'];

gulp.task('deploy', () => {
  return gulp.src(sourceFiles, {
    dot: true
  })
  .pipe(plumber({
    errorHandler: reportError
  }))
  .pipe(debug({
    title: 'deploy:'
  }))
  .pipe(gulpSSH.dest(config.connection.staging.base))
  .pipe(plumber.stop())
  .on('error', reportError);
});
