describe('Chart View', function() {
  var chartView;
  beforeEach(function() {
    chartView = new app.view.Chart({
      model: new app.model.Task({
        records: [{
          date: '2008-04-12',
          time: 10
        }]
      })
    });
  });

  xit('should append chart content', function() {
    var actualData;
    spyOn(Chart.prototype, 'Line').andCallFake(function(data, options) {
      actualData = data;
    });

    expect(chartView.$el).toContain('.chart-content');
    expect(actualData.labels[0]).toBe('04-12');
    expect(actualData.datasets.data[0]).toBe(10);
  });

  it('should remove element when rotate to vertical', function() {
    appendSetFixtures(chartView.$el);
    app.Event.trigger(app.Event.Rotate, 0);

    expect(chartView.$el).not.toExist();
  });

  it('should not remove element when rotate to to horizontal', function() {
    appendSetFixtures(chartView.$el);
    app.Event.trigger(app.Event.Rotate, 90);

    expect(chartView.$el).toExist();
  });
});