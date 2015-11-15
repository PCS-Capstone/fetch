'use strict';

describe('App.Views.SearchForm', function () {
  before(function () {
    this.$fixture = $('<div id="search-form-fixture"></div>');
  });

  beforeEach(function () {
    this.$fixture.empty().appendTo('#fixtures');
    this.view = new App.Views.SearchForm({
      el: this.$fixture
    });
  });

  after(function () {
    $('#fixtures').empty();
  });

  it('can render an empty search form', function () {
    var $animalType = $('#animal-type');
    var $addressBar = $('#address-bar');
    var $radius     = $('#radius-bar');
    var $startDate  = $('#start-date');
    var $endDate    = $('#end-date');
    var $colors     = $("[name=color-group]:checked").toArray();

    expect($animalType.val()).to.be.null;
    expect($addressBar.val()).to.equal('');
    expect($radius.val()).to.equal('');
    expect($startDate.val()).to.equal('');
    expect($endDate.val()).to.equal('');
    expect($colors).to.have.length(0);
  })
});