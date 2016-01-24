import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpRimraf from 'gulp-rimraf';
import gulpEslint from 'gulp-eslint';
import gulpPlumber from 'gulp-plumber';
import gulpUtil from 'gulp-util';
import gulpMocha from 'gulp-mocha';
import webpack from 'webpack';

import webpackConfig from './webpack.config.babel';

const ROOT_PATH = __dirname;

const SOURCE_PATH = 'src/**/*.{js,jsx}';

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
];

function buildWebpack(debug = false) {
  const { developement, production } = webpackConfig.configs;
  return (callback) => {
    webpack(debug ? developement : production).run((err, stats) => {
      if(err) {
        throw new gulpUtil.PluginError('webpack:build', err);
      }
      gulpUtil.log('[webpack:build]', stats.toString({
        colors: true,
        chunks: false,
      }));
      callback();
    });
  };
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

gulp.task('webpack:build-dev', ['babel:build'], buildWebpack(true));
gulp.task('webpack:build-prod', ['babel:build'], buildWebpack(false));

gulp.task('clean', () =>
  gulp.src(FILES_TO_CLEAN)
    .pipe(gulpRimraf())
);

gulp.task('babel:build', () =>
  gulp.src(SOURCE_PATH)
    .pipe(gulpPlumber())
    .pipe(gulpBabel())
    .pipe(gulp.dest(ROOT_PATH))
);

gulp.task('webpack:build', ['babel:build', 'webpack:build-dev']);

gulp.task('build', ['babel:build', 'webpack:build-prod']);
gulp.task('build-dev', ['babel:build', 'webpack:build-dev']);

gulp.task('watch', ['build-dev'], () => {
  gulp.watch(SOURCE_PATH, ['babel:build', 'webpack:build-dev']);
});

gulp.task('default', ['lint', 'build']);
