var dispatcher = require('./dispatcher'),
  constants = require('./constants');

Object.keys(constants).forEach(function (key) {
  var functionName = key.split('_').map(function (word, i) {
    //camel case
    return (i === 0) ? word.toLowerCase() : word[0] + word.slice(1).toLowerCase();
  }).join('');

  console.log('adding action; ', functionName);
  exports[functionName] = function (data) {
    dispatcher.dispatch({
      actionType: constants[key],
      data: data
    });
  };

});
