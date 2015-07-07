Package.describe({
  name: 'meteorhacks:react-layout',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'React Layout for Flow Router',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('react-layout.js');
  api.export('ReactLayout');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('meteorhacks:react-layout');
  api.addFiles('react-layout-tests.js');
});
