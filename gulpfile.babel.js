import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpPlumber from 'gulp-plumber';
import gulpClean from 'gulp-clean';
import gulpWebpack from 'gulp-webpack';
import webpackConfig from './webpack.config.babel';

const FILES_TO_NOT_COPY = [
  '*.js',
  'api',
  'componentEditors',
  'components',
  'data',
  'runtime',
  'settingsEditors',
];

const ROOT_PATH = __dirname;

const DIST_PATH = path.join(__dirname, 'public');

function buildBabel() {
  return gulp.src('src/**/*.js')
    .pipe(gulpPlumber())
    .pipe(gulpBabel())
    .pipe(gulp.dest(ROOT_PATH));
}

function buildWebpack(watch = false) {
  return () => {
    return gulp.src('src/entry.js')
      .pipe(gulpWebpack(Object.assign(webpackConfig, { watch })))
      .pipe(gulp.dest(webpackConfig.output.path));
  }
}

gulp.task('clean', () => {
  return gulp.src(DIST_PATH)
  .pipe(gulpClean());
});

gulp.task('babel', ['clean'], buildBabel);

gulp.task('build-webpack', ['clean'], buildWebpack());

gulp.task('copy-not-compilables', ['clean'], () => {
  return gulp.src([
    'src/**/*',
    ...FILES_TO_NOT_COPY.map((pattern) => `!src/**/${pattern}`),
  ].concat())
  .pipe(gulp.dest(DIST_PATH));
});

gulp.task('watch', ['default'], buildWebpack(true));

gulp.task('default', ['build-webpack', 'copy-not-compilables']);
