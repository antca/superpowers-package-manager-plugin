import _ from 'lodash';
import Promise from 'bluebird';

const DEFAULT_PAGE_SIZE = 100;
const ARRAY_PROPERTIES = ['keywords', 'dependencies', 'devDependencies'];
const SEARCH_URL = '//npmsearch.com/query';
const DEFAULT_FIELDS = [
  'name',
  'version',
  'description',
  'author',
  'maintainers',
  'homepage',
  'repository',
  'readme',
  'rating',
  'created',
  'modified',
  'dependencies',
  'devDependencies',
  'scripts',
  'keywords',

//   Currently bugged
//  'times',
];

function search(query, from = 0, size = DEFAULT_PAGE_SIZE, fields = DEFAULT_FIELDS) {
  return fetch(`${SEARCH_URL}?q=name:${query}&size=${size}&from=${from}&fields=${fields.join()}`)
  .then((result) => {
    if(!result.ok) {
      throw new Error(result.reason);
    }
    return result.json();
  }).then((result) =>
    Object.assign({}, {
      ...result,
      results: result.results.map((item) => _.mapValues(item, (prop, key) => {
        if(_.includes(ARRAY_PROPERTIES, key)) {
          return prop;
        }
        return prop[0];
      })),
    })
  );
}

const AUTOCOMPLETE_URL = '//ac.cnstrc.com/autocomplete/';
const AUTOCOMPLETE_CALLBACK_NAME = 'searchAutocompleteCallback';
const AUTOCOMPLETE_KEY = 'CD06z4gVeqSXRiDL2ZNK';
const AUTOCOMPLETE_TIMEOUT = 500;

let currentAutocompleteSearch = null;

function cancelAndCleanAutocompleteSearch() {
  if(currentAutocompleteSearch !== null) {
    clearTimeout(currentAutocompleteSearch.timeout);
    document.body.removeChild(currentAutocompleteSearch.script);
    currentAutocompleteSearch = null;
  }
}

function reformatResult(result) {
  return {
    autocomplete: true,
    results: result.sections.packages.map((item) => ({
      name: item.value,
      description: item.data.description,
    })),
    total: result.sections.packages.length,
  };
}

function autocompleteSearch(query) {
  cancelAndCleanAutocompleteSearch();
  if(!query) {
    return Promise.resolve({
      autocomplete: true,
      results: [],
      total: 0,
    });
  }
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Autocomplete search timed out !')), AUTOCOMPLETE_TIMEOUT);
    window[AUTOCOMPLETE_CALLBACK_NAME] = (result) => {
      clearTimeout(timeout);
      return resolve(reformatResult(result));
    };
    const script = document.createElement('SCRIPT');
    const parameters = {
      callback: AUTOCOMPLETE_CALLBACK_NAME,
      'autocomplete_key': AUTOCOMPLETE_KEY,
    };
    script.src = `${AUTOCOMPLETE_URL}${query}?${_.map(parameters, (value, key) => `${key}=${value}`).join('&')}`;
    document.body.appendChild(script);
    currentAutocompleteSearch = {
      timeout,
      script,
    };
  }).finally(cancelAndCleanAutocompleteSearch);
}

const NPM_REGISTERY_URL = '//registry.npmjs.org/';
const CORS_PROXY = '//cors.maxogden.com/';

function view(packageName) {
  return fetch(`${CORS_PROXY}${NPM_REGISTERY_URL}${packageName}`)
    .then((result) => {
      if(!result.ok) {
        throw new Error(result.reason);
      }
      return result.json();
    });
}

export { search, autocompleteSearch, view };
