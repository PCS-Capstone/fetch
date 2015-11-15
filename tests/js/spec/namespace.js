'use strict';

describe('Namespace', function () {
  
  it('provides an App object', function () {
    expect(App).to.be.defined;

    expect(App).to.include.keys(
      'Views',
      'Config',
      'Routers',
      'Templates',
      'Map',
      'Collections',
      'Models'
    );
  });

  it('provides an "app" instance', function () {
    expect(app).to.be.an('object');
  });
});