import assert from 'assert';
import { relative, join } from 'path';
import { readFile } from 'fs';
import {
  build,
  createEntryModule,
  install,
} from '../../src/utils/build';
import { rm, ls } from 'shelljs';
import _ from 'lodash';
import Promise from 'bluebird';

const { describe, it, afterEach } = global;
const readFileAsync = Promise.promisify(readFile);

const location = relative(join(process.cwd(), 'test'), __filename);
const tmpFolder = join(__dirname, 'tmp');

function includesAll(array, items) {
  const isIncludedInArray = _.curry(_.includes)(array);
  return _.every(items, isIncludedInArray);
}

const fixture = {
  assetId: 3,
  assetPath: join(tmpFolder, 'asset'),
  dependencies: {
    mathjs: {
      version: '2.5.0',
      bindings: [
        {
          modulePath: 'index',
          propertyName: 'mathjs',
        },
      ],
    },
    should: {
      version: '7.0.2',
      bindings: [
        {
          modulePath: 'as-function',
          propertyName: 'should',
        },
      ],
    },
    lodash: {
      version: '3.9.1',
      bindings: [
        {
          modulePath: 'index',
          propertyName: 'lodash',
        },
      ],
    },
  },
};

describe(location, function buildTest() {
  const buildTestTimeout = 20000;
  this.timeout(buildTestTimeout);

  afterEach(() => {
    rm('-rf', tmpFolder);
  });

  describe('build', () => {

    it('should build the asset correctly', () => {
      const { assetId, assetPath, dependencies } = fixture;
      return build(assetId, assetPath, dependencies).then(() => {
        const files = ls(assetPath);
        assert(includesAll(files, ['entry.js', 'bundle.js']), 'Asset directory contains expected files');
        const modules = ls(join(assetPath, 'node_modules'));
        assert(includesAll(modules, Object.keys(dependencies)), 'Modules in dependencies are installed');
      });
    });
  });

  describe('createEntryModule', () =>
    it('should output the correct entry.js file content', () => {
      const expectedResult = [
        'global.__npm[3]={\'mathjs\':require(\'mathjs/index\'),\'should\'',
        ':require(\'should/as-function\'),\'lodash\':require(\'lodash/index\'),}',
      ].join('');
      const { assetId, dependencies } = fixture;
      const result = createEntryModule(assetId, dependencies);
      assert(result === expectedResult, 'The result is the same the expected entry module content');
    })
  );

  describe('install', () => {
    it('should install the dependencies', () => {
      const { dependencies, assetPath } = fixture;
      return install(assetPath, dependencies).then(() => {
        const modules = ls(join(assetPath, 'node_modules'));
        assert(includesAll(modules, Object.keys(dependencies)), 'Modules in dependencies are installed');
      });
    });

    it('should change the version of the dependency', async () => { // eslint-disable-line arrow-parens
      const { assetPath, dependencies } = fixture;
      const lodashPackagePath = join(assetPath, 'node_modules', 'lodash', 'package.json');
      await install(assetPath, dependencies);
      const modules = ls(join(assetPath, 'node_modules'));
      assert(includesAll(modules, Object.keys(dependencies)), 'Modules in dependencies are installed');
      const lodashPackage = await readFileAsync(lodashPackagePath, 'utf8');
      const lodashVersion = JSON.parse(lodashPackage).version;
      assert(lodashVersion === dependencies.lodash.version, 'The installed version is the one specified');

      const updatedDependencies = Object.assign(_.cloneDeep(dependencies), {
        lodash: {
          version: '3.10.1',
          bindings: [
            {
              modulePath: 'index',
              propertyName: 'lodash',
            },
          ],
        },
      });
      await install(assetPath, updatedDependencies);
      const newLodashPackage = await readFileAsync(lodashPackagePath, 'utf8');
      const newLodashVersion = JSON.parse(newLodashPackage).version;
      assert(newLodashVersion === updatedDependencies.lodash.version, 'The installed version is the new one');
    });
  });
});
