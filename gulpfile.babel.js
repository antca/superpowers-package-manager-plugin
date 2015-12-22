import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpPlumber from 'gulp-plumber';
import gulpClean from 'gulp-clean';
import gulpUtil from 'gulp-util';
import gulpEslint from 'gulp-eslint';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel';

const ROOT_PATH = __dirname;

const SOURCE_PATH = 'src/**/*.{js,jsx}';

const FILES_TO_CLEAN = [
  'public/*',
  '!public/editors',
  'api',
  'bundleEditor',
  'components',
  'componentEditors',
  'data',
  'runtime',
  'utils',
  'settingsEditors',
];

gulp.task('lint', () =>
  gulp.src([SOURCE_PATH, 'gulpfile.babel.js', 'webpack.config.babel.js'])
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())
);

const webpackCompiler = webpack(webpackConfig);

gulp.task('webpack:build-dev', ['babel:build'], (callback) => {
  webpackCompiler.run((err, stats) => {
    if(err) {
      throw new gulpUtil.PluginError('webpack:build-dev', err);
    }
    gulpUtil.log('[webpack:build-dev]', stats.toString({
      colors: true,
    }));
    callback();
  });
});

gulp.task('clean', () => {
  return gulp.src(FILES_TO_CLEAN)
    .pipe(gulpClean());
});

gulp.task('babel:build', () =>
  gulp.src(SOURCE_PATH)
    .pipe(gulpPlumber())
    .pipe(gulpBabel())
    .pipe(gulp.dest(ROOT_PATH))
);

gulp.task('webpack:build', ['babel:build', 'webpack:build-dev']);

gulp.task('build', ['babel:build', 'webpack:build-dev']);

gulp.task('watch', ['build'], () => {
  gulp.watch(SOURCE_PATH, ['babel:build', 'webpack:build-dev']);
});

gulp.task('default', ['lint', 'build']);
