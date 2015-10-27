var flux = require('flux'),
  dispatcher = new flux.Dispatcher();

dispatcher.register(function (action) {
  console.log('action: ', action);
});

module.exports = dispatcher;
