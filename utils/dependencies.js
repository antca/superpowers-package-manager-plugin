'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ied = require('ied');

var _ied2 = _interopRequireDefault(_ied);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function template(assetId, dependencies) {
  return 'window.__npm[' + assetId + ']={' + _lodash2.default.map(dependencies, function (_ref, moduleName) {
    var bindings = _ref.bindings;
    return '' + bindings.map(function (_ref2) {
      var propertyName = _ref2.propertyName;
      var modulePath = _ref2.modulePath;
      return '\'' + propertyName + '\':require(\'' + moduleName + (modulePath === '' ? '' : '/' + modulePath) + '\'),';
    }).join('');
  }).join('') + '}';
}

function formatDependencies(dependencies) {
  return _lodash2.default.map(dependencies, function (_ref3, name) {
    var version = _ref3.version;
    return [name, version];
  });
}

function install(assetPath, dependencies) {
  var installAsync = _bluebird2.default.promisify(_ied2.default.install);
  var exposeAsync = _bluebird2.default.promisify(_ied2.default.expose);
  var nodeModules = _path2.default.join(assetPath, 'node_modules');
  var dependenciesArray = formatDependencies(dependencies);
  return dependenciesArray.reduce(function (prev, dependency) {
    return prev.then(function () {
      return installAsync.apply(undefined, [nodeModules].concat(_toConsumableArray(dependency)));
    }).then(function (pkg) {
      return exposeAsync(nodeModules, pkg);
    }).catch(function (error) {
      if (error.code !== 'LOCKED') {
        throw error;
      }
    });
  }, _bluebird2.default.resolve());
}

function bundle(assetId, assetPath, dependencies) {
  var config = {
    context: assetPath,
    entry: './entry.js',
    output: {
      path: assetPath,
      filename: 'bundle.js'
    }
  };
  return _fs2.default.writeFileAsync(_path2.default.join(config.context, config.entry), template(assetId, dependencies)).then(function () {
    return new _bluebird2.default(function (resolve, reject) {
      return (0, _webpack2.default)(config, function (error, stats) {
        if (error) {
          return reject(error);
        }
        return resolve(stats);
      });
    });
  });
}

function build(assetId, assetPath, dependencies) {
  return install(assetPath, dependencies).then(function () {
    return bundle(assetId, assetPath, dependencies);
  });
}

exports.build = build;
//# sourceMappingURL=data:application/json;base64,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L0MsU0FBTyxPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUNwQyxJQUFJLENBQUM7V0FBTSxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUM7R0FBQSxDQUFDLENBQUM7Q0FDekQ7O1FBRVEsS0FBSyxHQUFMLEtBQUsiLCJmaWxlIjoidXRpbHMvZGVwZW5kZW5jaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBpZWQgZnJvbSAnaWVkJztcbmltcG9ydCB3ZWJwYWNrIGZyb20gJ3dlYnBhY2snO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZShhc3NldElkLCBkZXBlbmRlbmNpZXMpIHtcbiAgcmV0dXJuIGB3aW5kb3cuX19ucG1bJHthc3NldElkfV09eyR7Xy5tYXAoZGVwZW5kZW5jaWVzLCAoeyBiaW5kaW5ncyB9LCBtb2R1bGVOYW1lKSA9PlxuICAgIGAke2JpbmRpbmdzLm1hcCgoeyBwcm9wZXJ0eU5hbWUsIG1vZHVsZVBhdGggfSkgPT5cbiAgICAgIGAnJHtwcm9wZXJ0eU5hbWV9JzpyZXF1aXJlKCcke21vZHVsZU5hbWV9JHttb2R1bGVQYXRoID09PSAnJyA/ICcnIDogYC8ke21vZHVsZVBhdGh9YH0nKSxgKS5qb2luKCcnKX1gXG4gICkuam9pbignJyl9fWA7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERlcGVuZGVuY2llcyhkZXBlbmRlbmNpZXMpIHtcbiAgcmV0dXJuIF8ubWFwKGRlcGVuZGVuY2llcywgKHsgdmVyc2lvbiB9LCBuYW1lKSA9PiBbbmFtZSwgdmVyc2lvbl0pO1xufVxuXG5mdW5jdGlvbiBpbnN0YWxsKGFzc2V0UGF0aCwgZGVwZW5kZW5jaWVzKSB7XG4gIGNvbnN0IGluc3RhbGxBc3luYyA9IFByb21pc2UucHJvbWlzaWZ5KGllZC5pbnN0YWxsKTtcbiAgY29uc3QgZXhwb3NlQXN5bmMgPSBQcm9taXNlLnByb21pc2lmeShpZWQuZXhwb3NlKTtcbiAgY29uc3Qgbm9kZU1vZHVsZXMgPSBwYXRoLmpvaW4oYXNzZXRQYXRoLCAnbm9kZV9tb2R1bGVzJyk7XG4gIGNvbnN0IGRlcGVuZGVuY2llc0FycmF5ID0gZm9ybWF0RGVwZW5kZW5jaWVzKGRlcGVuZGVuY2llcyk7XG4gIHJldHVybiBkZXBlbmRlbmNpZXNBcnJheS5yZWR1Y2UoXG4gICAgKHByZXYsIGRlcGVuZGVuY3kpID0+XG4gICAgICBwcmV2LnRoZW4oKCkgPT5cbiAgICAgICAgaW5zdGFsbEFzeW5jKG5vZGVNb2R1bGVzLCAuLi5kZXBlbmRlbmN5KSlcbiAgICAgICAgLnRoZW4oKHBrZykgPT4gZXhwb3NlQXN5bmMobm9kZU1vZHVsZXMsIHBrZykpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBpZihlcnJvci5jb2RlICE9PSAnTE9DS0VEJykge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICBQcm9taXNlLnJlc29sdmUoKSk7XG59XG5cbmZ1bmN0aW9uIGJ1bmRsZShhc3NldElkLCBhc3NldFBhdGgsIGRlcGVuZGVuY2llcykge1xuICBjb25zdCBjb25maWcgPSB7XG4gICAgY29udGV4dDogYXNzZXRQYXRoLFxuICAgIGVudHJ5OiAnLi9lbnRyeS5qcycsXG4gICAgb3V0cHV0OiB7XG4gICAgICBwYXRoOiBhc3NldFBhdGgsXG4gICAgICBmaWxlbmFtZTogJ2J1bmRsZS5qcycsXG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIGZzLndyaXRlRmlsZUFzeW5jKHBhdGguam9pbihjb25maWcuY29udGV4dCwgY29uZmlnLmVudHJ5KSwgdGVtcGxhdGUoYXNzZXRJZCwgZGVwZW5kZW5jaWVzKSlcbiAgICAudGhlbigoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB3ZWJwYWNrKGNvbmZpZywgKGVycm9yLCBzdGF0cykgPT4ge1xuICAgICAgaWYoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZShzdGF0cyk7XG4gICAgfSkpKTtcbn1cblxuZnVuY3Rpb24gYnVpbGQoYXNzZXRJZCwgYXNzZXRQYXRoLCBkZXBlbmRlbmNpZXMpIHtcbiAgcmV0dXJuIGluc3RhbGwoYXNzZXRQYXRoLCBkZXBlbmRlbmNpZXMpXG4gICAgLnRoZW4oKCkgPT4gYnVuZGxlKGFzc2V0SWQsIGFzc2V0UGF0aCwgZGVwZW5kZW5jaWVzKSk7XG59XG5cbmV4cG9ydCB7IGJ1aWxkIH07XG4iXX0=