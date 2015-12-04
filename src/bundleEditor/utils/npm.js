const DEFAULT_PAGE_SIZE = 100;

function search(query, size = DEFAULT_PAGE_SIZE, from = 0) {
  const fields = [
    'author',
    'created',
    'dependencies',
    'description',
    'devDependencies',
    'homepage',
    'keywords',
    'maintainers',
    'modified',
    'name',
    'readme',
    'repository',
    'scripts',
    'version',
    'rating',

//   Currently bugged
//  'times',
  ];
  return fetch(`//npmsearch.com/query?q=${query}&size=${size}&from=${from}&fields=${fields.join()}`)
  .then((result) => {
    if(!result.ok) {
      throw new Error(result.reason);
    }
    return result.json();
  });
}

export { search };
