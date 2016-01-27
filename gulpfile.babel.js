import path from 'path';

import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpRimraf from 'gulp-rimraf';
import gulpEslint from 'gulp-eslint';
import gulpPlumber from 'gulp-plumber';
import gulpUtil from 'gulp-util';
import gulpMocha from 'gulp-mocha';
import gulpInstall from 'gulp-install';
import gulpZip from 'gulp-zip';
import webpack from 'webpack';

import pkg from './package';
import webpackConfig from './webpack.config.babel';

const ROOT_PATH = __dirname;
const SOURCE_PATH = 'src/**/*.{js,jsx}';

const TMP_PACKAGE = 'tmp_package';

const FILES_TO_CLEAN = [
  'public/*',
  '!public/{editors,locales}',
  'api',
  'bundleEditor',
  'components',
  'componentEditors',
  'data',
  'runtime',
  'utils',
  'settingsEditors',
  'config',
  TMP_PACKAGE,
];

const FOLDERS_TO_PACKAGE = [
  'api',
  'bundleEditor',
  'componentEditor',
  'components',
  'config',
  'data',
  'public',
  'runtime',
  'settingsEditors',
  'utils',
];

function createPackageFolder() {
  return gulp.src(FOLDERS_TO_PACKAGE.map((folder) => `${folder}/**`)
      .concat('package.json'), { base: '.' })
    .pipe(gulp.dest(path.join(TMP_PACKAGE, pkg.authorNickname, pkg.name)))
    .pipe(gulpInstall({ production: true }));
}

function createPackageZip() {
  return gulp.src(`${TMP_PACKAGE}/**`)
    .pipe(gulpZip(`${pkg.name}-v${pkg.version}-${ new Date()
      .toISOString()
      .replace(/\W/g, '')}.zip`))
    .pipe(gulp.dest('releases'));
}

function clean() {
  return gulp.src(FILES_TO_CLEAN)
    .pipe(gulpRimraf());
}

gulp.task('lint', () =>
  gulp.src([SOURCE_PATH, 'gulpfile.babel.js', 'webpack.config.babel.js'])
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())
);

gulp.task('test', () =>
  gulp.src(['test/**/*.js'], { read: false })
    .pipe(gulpMocha({ reporter: 'spec' }))
    .on('error', gulpUtil.log)
);

gulp.task('watch-test', () => {
  gulp.watch(['src/**', 'test/**'], ['test']);
});

gulp.task('babel:build', () =>
  gulp.src(SOURCE_PATH)
    .pipe(gulpPlumber())
    .pipe(gulpBabel())
    .pipe(gulp.dest(ROOT_PATH))
);

gulp.task('webpack:build', ['babel:build'], (callback) => {
  webpack(webpackConfig).run((err, stats) => {
    if(err) {
      throw new gulpUtil.PluginError('webpack:build', err);
    }
    gulpUtil.log('[webpack:build]', stats.toString({
      colors: true,
      chunks: false,
    }));
    callback();
  });
});

gulp.task('clean', clean);

gulp.task('build', ['babel:build', 'webpack:build']);

gulp.task('watch', ['build'], () => {
  gulp.watch(SOURCE_PATH, ['babel:build', 'webpack:build']);
});

gulp.task('package:createFolder', ['build'], createPackageFolder);
gulp.task('package:createZip', ['build', 'package:createFolder'], createPackageZip);

gulp.task('package:build-clean', ['package:createZip'], clean);

gulp.task('default', ['lint', 'build']);
