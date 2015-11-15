'use strict';

describe('The Backbone application', function () {

  it('should have access to lodash', function () {
    expect(window._).to.be.defined;
    expect(window._.VERSION).to.be.defined;
  });

  it('should have access to Handlebars', function () {
    expect(window.Handlebars).to.be.defined;
    expect(window.Handlebars.compile).to.be.defined;
  });

  it('should have access to jQuery', function () {
    expect(window.$).to.be.defined;
    expect(window.$.get).to.be.defined;
  });

  it('should have access to Backbone', function () {
    expect(window.Backbone).to.be.defined;
    expect(window.Backbone.View).to.be.defined;
    expect(window.Backbone.Collection).to.be.defined;
    expect(window.Backbone.Model).to.be.defined;
    expect(window.Backbone.Router).to.be.defined;
  });
});