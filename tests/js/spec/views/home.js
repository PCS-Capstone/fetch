'use strict';

describe('App.Views.HomePage', function () {
  before(function () {
    this.$fixture = $('<div id="home-view-fixture"></div>');
  });

  beforeEach(function () {
    this.$fixture.empty().appendTo('#fixtures');
    this.view = new App.Views.HomePage({
      el: this.$fixture
    });
    console.log(this.view.el.innerHTML);
  });

  afterEach(function () {
    this.view.remove();
  });

  after(function () {
    $('#fixtures').empty();
  });

  describe('events', function () {

    it('fires events when clicking nav buttons', function () {

      var test = this.$fixture
      console.log(test.html());
      var uploadSpy = sinon.spy();
      this.view.bind('nav:upload', uploadSpy);

      this.$fixture.find('#found-button').click();

      expect(uploadSpy).to.have.been.calledOnce;
    });
  });
});