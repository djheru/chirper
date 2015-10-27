var actions = require('./actions');

var API = {
  fetchChirps: function () {
    get('/api/chirps').then(actions.gotChirps.bind(actions));
  }
};

var get = function (url) {
  return fetch(url, {
    credentials: 'same-origin'
  }).then(function (res) {
    return res.json();
  });
}

module.exports = API;
